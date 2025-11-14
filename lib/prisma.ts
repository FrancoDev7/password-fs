import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}
export const db: PrismaClient = globalThis.prisma ?? new PrismaClient();

// esto es para evitar multiples instancias en desarrollo
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
