import "dotenv/config"; // <- ESTA LÍNEA ES LA CLAVE
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // esto revienta si DATABASE_URL no existe
    url: env("DATABASE_URL"),
  },
});
