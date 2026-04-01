import { Request, Response, NextFunction } from "express";
import { prisma } from "@/lib/prisma.js";

/**
 * API key kontrol middleware'i
 * x-api-key header'ini kontrol eder, eksik veya gecersizse 401 doner
 */
export async function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || typeof apiKey !== "string") {
    res.status(401).json({ error: "UNAUTHORIZED", message: "API key required" });
    return;
  }

  try {
    const keyRecord = await prisma.apiKey.findUnique({
      where: { key: apiKey },
      select: { isActive: true },
    });

    if (!keyRecord || !keyRecord.isActive) {
      res.status(401).json({ error: "UNAUTHORIZED", message: "Invalid API key" });
      return;
    }

    next();
  } catch {
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR", message: "API key check failed" });
  }
}
