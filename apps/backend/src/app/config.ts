import dotenv from "dotenv";

const APP_ENV = process.env.APP_ENV ?? "local";

dotenv.config({ path: `.env` });
dotenv.config({ path: `.env.${APP_ENV}`, override: true });

export const config = {
  appEnv: APP_ENV,
  logger: {
    levels: ["debug", "info", "warn", "error"],
  },
  services: {
    prisma: {
      url: process.env.DATABASE_URL ?? "",
    },
    graphql: {
      port: process.env.PORT ? Number(process.env.PORT) : 3001,
    },
  },
};
