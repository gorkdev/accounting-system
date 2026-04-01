import { Router } from "express";

import { getDatabaseHealth } from "@/services/database.service.js";
import { userRouter } from "./user.routes.js";

export const router = Router();

// Health check endpoint
router.get("/", async (_req, res) => {
  const database = await getDatabaseHealth();
  res.json({
    backend: "calisiyor",
    ...database,
  });
});

// User endpoints (API key gerektirir)
router.use("/api", userRouter);

