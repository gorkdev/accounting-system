import { prisma } from "@/lib/prisma.js";

export type UserDto = {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserServiceResult =
  | { success: true; data: UserDto[] }
  | { success: false; error: string };

/**
 * Tüm kullanici listesini doner
 * - Hata yoksa boş array dahil success: true doner
 * - Veritabani hatası durumunda success: false doner
 */
export async function getUsers(): Promise<UserServiceResult> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: users };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}
