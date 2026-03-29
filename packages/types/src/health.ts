/**
 * API GET / yaniti — backend + Prisma/DB saglik bilgisi.
 * apps/api ile apps/web arasinda tek kaynak.
 */
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

/**
 * GET / JSON — web `$fetch` icin; `reason` yalnizca hata durumunda gelir.
 * (DatabaseHealth birlesiminde basari dalinda `reason` olmadigi icin ayri tanim.)
 */
export type ApiRootHealthResponse = {
  backend: string;
  prisma?: string;
  db?: string;
  reason?: string;
};
