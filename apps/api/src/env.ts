import { config as dotenvConfig } from "dotenv";
import { z } from "zod";

dotenvConfig();

const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);

