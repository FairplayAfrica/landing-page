import dotenv from "dotenv";

dotenv.config();

function parseCorsOrigins(raw: string | undefined): string | string[] {
  if (!raw) return "http://localhost:3000";
  const origins = raw
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  return origins.length === 1 ? origins[0] : origins;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  port: parseInt(process.env.PORT || "4000", 10),
  corsOrigin: parseCorsOrigins(process.env.CORS_ORIGIN),
} as const;

// Validate required env vars at startup
const required = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"] as const;
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}
