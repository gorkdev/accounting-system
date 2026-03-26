import { prisma } from "@/lib/prisma.js";

export type DatabaseHealth =
  | {
      prisma: "calisiyor";
      db: "calisiyor";
    }
  | {
      prisma: "calismiyor";
      db: "calismiyor";
      reason: string;
    };

export async function checkDatabaseConnectionOnStartup() {
  try {
    await prisma.$connect();
    console.log("[api] database connection successful");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[api] database connection failed: ${message}`);
  }
}

export async function getDatabaseHealth(): Promise<DatabaseHealth> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { prisma: "calisiyor", db: "calisiyor" };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    return { prisma: "calismiyor", db: "calismiyor", reason };
  }
}

