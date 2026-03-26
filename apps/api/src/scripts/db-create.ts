import { readFile, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { Client } from "pg";

import { env } from "@/env.js";

function withDb(url: URL, dbName: string) {
  const next = new URL(url.toString());
  next.pathname = `/${dbName}`;
  return next;
}

async function promptPasswordIfNeeded(databaseUrl: URL) {
  const hasPassword = databaseUrl.password.length > 0 && databaseUrl.password !== "YOUR_PASSWORD";
  if (hasPassword) return;

  // NOTE: readline doesn't provide a fully "hidden" input without extra deps.
  // We still avoid echoing the value back; user will see what they type.
  const rl = createInterface({ input, output });
  try {
    const pw = (await rl.question("PostgreSQL password (will be saved to .env): ")).trim();
    if (!pw) throw new Error("Password is required");
    databaseUrl.password = pw;
  } finally {
    rl.close();
  }
}

async function upsertEnvPassword(password: string) {
  const envPath = new URL("../../.env", import.meta.url);
  const raw = await readFile(envPath, "utf8").catch(() => "");
  if (!raw) return;

  // Replace only the placeholder in DATABASE_URL if present.
  const next = raw.replace(/(DATABASE_URL\s*=\s*".*?:)(YOUR_PASSWORD)(@.*")/, `$1${password}$3`);
  if (next !== raw) await writeFile(envPath, next, "utf8");
}

async function main() {
  const appUrl = new URL(env.DATABASE_URL);
  const targetDbName = appUrl.pathname.replace(/^\//, "").split("/")[0] || "account_system";

  await promptPasswordIfNeeded(appUrl);
  await upsertEnvPassword(appUrl.password);

  const adminUrl = withDb(appUrl, "postgres");

  const client = new Client({
    connectionString: adminUrl.toString(),
  });

  await client.connect();
  try {
    const exists = await client.query(
      "select 1 as ok from pg_database where datname = $1 limit 1",
      [targetDbName],
    );

    if (exists.rowCount && exists.rowCount > 0) {
      console.log(`[db] database already exists: ${targetDbName}`);
      return;
    }

    // Can't parameterize identifiers; keep it safe by allowing only a strict name.
    if (!/^[a-z0-9_]+$/.test(targetDbName)) {
      throw new Error(`Invalid database name: ${targetDbName}`);
    }

    await client.query(`create database ${targetDbName}`);
    console.log(`[db] database created: ${targetDbName}`);
  } finally {
    await client.end();
  }
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`[db] failed: ${message}`);
  process.exitCode = 1;
});

