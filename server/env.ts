import * as dotenv from "dotenv";
dotenv.config();
function requireEnv<T = string>(name: string, defaultValue: any = null): T {
  const value = process.env[name];
  if (value === undefined && defaultValue == null) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value ?? defaultValue;
}

export const SESSION_SECRET = requireEnv("SESSION_SECRET");
export const NODE_ENV = requireEnv("NODE_ENV");
export const PORT = requireEnv<number>("PORT", 8080);
export const DATABASE_FILE = requireEnv("DATABASE_FILE", "database.db");
