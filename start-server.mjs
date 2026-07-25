import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import handler from "./dist/server/server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientRoot = path.resolve(path.join(__dirname, "dist/client"));
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";

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
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".html": "text/html; charset=utf-8",
};

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

  if (!response.body) {
    res.end();
    return;
  }

  Readable.fromWeb(response.body).pipe(res);
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
  res.statusCode = 200;
  res.setHeader("Content-Type", contentType);
  if (pathname.startsWith("/assets/")) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  }

  if (req.method === "HEAD") {
    res.end();
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
