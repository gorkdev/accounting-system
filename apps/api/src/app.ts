import cors from "cors";
import express from "express";
import helmet from "helmet";

import { router } from "./routes/index.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "2mb" }));

  app.use(router);

  app.use((req, res) => {
    res.status(404).json({ error: "NOT_FOUND", path: req.path });
  });

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  });

  return app;
}

