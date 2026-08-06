import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { createGzip } from "node:zlib";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";
import handler from "./dist/server/server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientRoot = path.resolve(path.join(__dirname, "dist/client"));
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".html": "text/html; charset=utf-8",
};

const COMPRESSIBLE = new Set([
  ".css",
  ".js",
  ".mjs",
  ".json",
  ".svg",
  ".xml",
  ".txt",
  ".html",
]);

function requestFromNode(req) {
  const url = `http://${req.headers.host}${req.url}`;
  return new Request(url, {
    method: req.method,
    headers: req.headers,
    duplex: "half",
    body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
  });
}

async function sendNodeResponse(res, response) {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      res.appendHeader(key, value);
      return;
    }
    res.setHeader(key, value);
  });

  // Ensure HTML responses are not cached forever (SSR freshness).
  if (!response.headers.has("cache-control")) {
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("text/html")) {
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    }
  }

  if (!response.body) {
    res.end();
    return;
  }

  Readable.fromWeb(response.body).pipe(res);
}

function cacheControlForPath(pathname, ext) {
  if (pathname.startsWith("/assets/")) {
    return "public, max-age=31536000, immutable";
  }
  // CMS images use unique filenames — safe to cache long in the browser.
  if (
    pathname.startsWith("/images/") ||
    pathname.startsWith("/fonts/") ||
    ext === ".woff" ||
    ext === ".woff2" ||
    ext === ".webp" ||
    ext === ".avif" ||
    ext === ".png" ||
    ext === ".jpg" ||
    ext === ".jpeg" ||
    ext === ".gif" ||
    ext === ".svg" ||
    ext === ".ico"
  ) {
    return "public, max-age=31536000, immutable, stale-while-revalidate=86400";
  }
  return null;
}

function tryServeStatic(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") return false;

  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);
  if (!pathname || pathname.includes("..")) return false;

  const filePath = path.resolve(path.join(clientRoot, pathname.replace(/^\//, "")));
  if (!filePath.startsWith(clientRoot)) return false;
  if (!existsSync(filePath)) return false;

  const stats = statSync(filePath);
  if (!stats.isFile()) return false;

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] ?? "application/octet-stream";
  const acceptsGzip = String(req.headers["accept-encoding"] ?? "").includes("gzip");
  const shouldGzip = acceptsGzip && COMPRESSIBLE.has(ext) && stats.size > 1024;

  const etag = `W/"${stats.size.toString(16)}-${Math.floor(stats.mtimeMs).toString(16)}"`;
  if (req.headers["if-none-match"] === etag) {
    res.statusCode = 304;
    res.end();
    return true;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", contentType);
  res.setHeader("Vary", "Accept-Encoding");
  res.setHeader("ETag", etag);
  res.setHeader("Last-Modified", stats.mtime.toUTCString());

  const cache = cacheControlForPath(pathname, ext);
  if (cache) res.setHeader("Cache-Control", cache);

  if (req.method === "HEAD") {
    res.end();
    return true;
  }

  if (shouldGzip) {
    res.setHeader("Content-Encoding", "gzip");
    void pipeline(createReadStream(filePath), createGzip({ level: 6 }), res).catch(() => {
      if (!res.headersSent) res.statusCode = 500;
      res.end();
    });
    return true;
  }

  createReadStream(filePath).pipe(res);
  return true;
}

async function handleSsr(req, res) {
  try {
    const response = await handler.fetch(requestFromNode(req));
    await sendNodeResponse(res, response);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}

const server = createServer((req, res) => {
  if (tryServeStatic(req, res)) return;
  void handleSsr(req, res);
});

server.listen(port, host, () => {
  console.log(`YatraNexus listening on http://${host}:${port}`);
});
