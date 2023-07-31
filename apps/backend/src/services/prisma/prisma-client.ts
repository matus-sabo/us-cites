import { PrismaClient } from "@prisma/client";
import { createPrismaMigrateService } from "./prisma-migrate-service";

export type PrismaClientExtended = ReturnType<typeof createPrismaClient>;

export type PrismaModel = {
  [K in keyof PrismaClientExtended as PrismaClientExtended[K] extends {
    findFirst: (...args: any[]) => any;
  }
    ? K
    : never]: PrismaClientExtended[K] extends {
    findFirst: (...args: any[]) => any;
  }
    ? NonNullable<Awaited<ReturnType<PrismaClientExtended[K]["findFirst"]>>>
    : never;
};

export type CityData = {
  lat?: string;
  lng?: string;
  population?: string;
  density?: string;
  source?: string;
  military?: string;
  incorporated?: string;
  timezone?: string;
  ranking?: string;
  zips?: string[];
};

export const createPrismaClient = (options: { url: string }) => {
  const { migrate } = createPrismaMigrateService();
  return new PrismaClient({
    datasources: { db: { url: options.url } },
  }).$extends({
    client: { migrate },
    result: {
      city: {
        data: {
          needs: { data: true },
          compute({ data }) {
            return data as unknown as CityData;
          },
        },
      },
    },
  });
};
