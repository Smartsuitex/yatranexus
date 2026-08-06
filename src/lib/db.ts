import mysql from "mysql2/promise";

export type DbConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export function parseDatabaseUrl(url: string): DbConfig {
  const parsed = new URL(url);
  const database = parsed.pathname.replace(/^\//, "");
  if (!database) {
    throw new Error("DATABASE_URL must include a database name.");
  }
  return {
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database,
  };
}

export function getDbConfig(): DbConfig {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured.");
  }
  return parseDatabaseUrl(url);
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
