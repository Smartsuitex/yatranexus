import mysql from "mysql2/promise";

export type DbConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export function parseDatabaseUrl(raw: string): DbConfig {
  let url = String(raw ?? "").trim();
  // Hostinger / panel paste quirks
  if (
    (url.startsWith('"') && url.endsWith('"')) ||
    (url.startsWith("'") && url.endsWith("'"))
  ) {
    url = url.slice(1, -1).trim();
  }
  // Pasted whole ".env line" into the value field: DATABASE_URL=mysql://...
  url = url.replace(/^DATABASE_URL\s*=\s*/i, "").trim();
  if (
    (url.startsWith('"') && url.endsWith('"')) ||
    (url.startsWith("'") && url.endsWith("'"))
  ) {
    url = url.slice(1, -1).trim();
  }

  if (!url) {
    throw new Error("DATABASE_URL is empty.");
  }

  // Prefer mysql://user:pass@host:port/db — supports raw @ in password
  // by taking the last @ before host (URL() throws "Invalid URL" otherwise).
  const mysqlMatch = url.match(
    /^mysql:\/\/([^:/?#]+):(.+)@([^:/?#]+)(?::(\d+))?\/([^?#]+)/i,
  );
  if (mysqlMatch) {
    const [, user, password, hostRaw, portRaw, databaseRaw] = mysqlMatch;
    const host =
      hostRaw === "localhost" || hostRaw === "::1" ? "127.0.0.1" : hostRaw;
    const database = databaseRaw.replace(/[?#].*$/, "").replace(/\/+$/, "");
    if (!database) {
      throw new Error("DATABASE_URL must include a database name.");
    }
    return {
      host,
      port: portRaw ? Number(portRaw) : 3306,
      user: decodeURIComponent(user),
      password: decodeURIComponent(password),
      database: decodeURIComponent(database),
    };
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(
      `DATABASE_URL is invalid. Use: mysql://USER:PASSWORD@127.0.0.1:3306/DBNAME (encode @ in password as %40). Got: ${url.slice(0, 40)}…`,
    );
  }

  const database = parsed.pathname.replace(/^\//, "").replace(/\/+$/, "");
  if (!database) {
    throw new Error("DATABASE_URL must include a database name.");
  }
  // Force IPv4 — `localhost` often resolves to ::1 and Hostinger MySQL
  // rejects `user@'::1'` even when 127.0.0.1 works.
  const host =
    parsed.hostname === "localhost" || parsed.hostname === "::1"
      ? "127.0.0.1"
      : parsed.hostname;
  return {
    host,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: decodeURIComponent(database),
  };
}

function normalizeHost(host: string): string {
  const h = host.trim();
  return h === "localhost" || h === "::1" ? "127.0.0.1" : h;
}

/**
 * Prefer discrete DB_* vars on Hostinger (some panels reject mysql:// as
 * "Invalid URL"). Fall back to DATABASE_URL for local / standard setups.
 */
export function getDbConfig(): DbConfig {
  const user =
    process.env.DB_USER?.trim() ||
    process.env.MYSQL_USER?.trim() ||
    undefined;
  const password =
    process.env.DB_PASSWORD ??
    process.env.MYSQL_PASSWORD ??
    "";
  const database =
    process.env.DB_NAME?.trim() ||
    process.env.DB_DATABASE?.trim() ||
    process.env.MYSQL_DATABASE?.trim() ||
    undefined;
  const hostRaw =
    process.env.DB_HOST?.trim() ||
    process.env.MYSQL_HOST?.trim() ||
    "127.0.0.1";
  const portRaw =
    process.env.DB_PORT || process.env.MYSQL_PORT || "3306";

  if (user && database) {
    return {
      host: normalizeHost(hostRaw),
      port: Number(portRaw) || 3306,
      user,
      password,
      database,
    };
  }

  const url = process.env.DATABASE_URL?.trim();
  if (url) {
    return parseDatabaseUrl(url);
  }

  const present = [
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
    "DATABASE_URL",
    "MYSQL_HOST",
    "MYSQL_USER",
    "MYSQL_PASSWORD",
    "MYSQL_DATABASE",
  ]
    .filter((k) => Boolean(process.env[k]?.trim()))
    .join(", ");

  throw new Error(
    `Database is not configured. Add ALL of: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME (then Redeploy). ` +
      `Currently set: ${present || "(none)"}. ` +
      `Example DB_USER=u391320881_mysql DB_NAME=u391320881_yatranexus`,
  );
}

export function createPool(config?: DbConfig) {
  const cfg = config ?? getDbConfig();
  return mysql.createPool({
    ...cfg,
    waitForConnections: true,
    connectionLimit: 10,
    timezone: "Z",
    dateStrings: false,
  });
}

export type DbPool = ReturnType<typeof createPool>;
