import { Router } from "express";

import { getDatabaseHealth } from "@/services/database.service.js";

export const router = Router();

router.get("/", async (_req, res) => {
  const database = await getDatabaseHealth();
  res.json({
    backend: "calisiyor",
    ...database,
  });
});

