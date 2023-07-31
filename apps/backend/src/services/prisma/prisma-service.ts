import { createService, useContext } from "#app";
import { createPrismaClient, PrismaClientExtended } from "./prisma-client.js";

export const createPrismaService = () => {
  const handles = {
    prisma: undefined as PrismaClientExtended | undefined,
  };
  const service = createService({
    name: "Prisma",
    start: async () => {
      const ctx = useContext();
      handles.prisma = createPrismaClient({
        url: ctx.call.config.services.prisma.url,
      });
      await handles.prisma.migrate();
      await handles.prisma.$connect();
    },
    stop: async () => {
      await handles.prisma?.$disconnect();
    },
  });
  return {
    get call() {
      if (!handles.prisma) {
        throw new Error("Should not happen");
      }
      return handles.prisma;
    },
    ...service,
  };
};
