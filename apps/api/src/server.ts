import { createApp } from "./app.js";
import { env } from "./env.js";
import { checkDatabaseConnectionOnStartup } from "./services/database.service.js";

export async function startServer() {
  const app = createApp();

  await checkDatabaseConnectionOnStartup();

  app.listen(env.PORT, () => {
    console.log(`[api] listening on http://localhost:${env.PORT}`);
  });
}

