import { Router } from "express";
import { requireApiKey } from "@/middleware/api-key.middleware.js";
import { getUsers } from "@/services/user.service.js";

export const userRouter = Router();

/**
 * GET /api/user
 * API key ile korunan user listesi endpoint'i
 */
userRouter.get("/user", requireApiKey, async (_req, res) => {
  const result = await getUsers();

  if (!result.success) {
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR", message: result.error });
    return;
  }

  // User listesi (bos array dahil) basariyla doner
  res.status(200).json({ data: result.data });
});
