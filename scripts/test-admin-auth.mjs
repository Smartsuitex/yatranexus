import { readFileSync } from "node:fs";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import { SignJWT, jwtVerify } from "jose";

for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Za-z_#][A-Za-z0-9_]*)=(.*)$/);
  if (m && !m[1].startsWith("#")) {
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const [rows] = await conn.query("SELECT id, email, password_hash FROM admin_users LIMIT 1");
const admin = rows[0];
console.log("Admin:", admin.email);
console.log("Password match:", await bcrypt.compare(process.env.ADMIN_PASSWORD, admin.password_hash));
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const token = await new SignJWT({ email: admin.email, fullName: "Super Admin", role: "admin" })
  .setProtectedHeader({ alg: "HS256" })
  .setSubject(admin.id)
  .setIssuedAt()
  .setExpirationTime("7d")
  .sign(secret);
const { payload } = await jwtVerify(token, secret);
console.log("JWT verify ok, sub:", payload.sub);
await conn.end();
