import { createConfigService } from "../services/core/config-service.js";
import { createManagerService } from "../services/core/manager-service.js";
import { createUtilsService } from "../services/core/utils-service.js";
import { createGraphqlService } from "../services/graphql/graphql-service.js";
import { createPrismaService } from "../services/prisma/prisma-service.js";

export const createServices = () => ({
  manager: createManagerService(),
  config: createConfigService(),
  utils: createUtilsService(),
  prisma: createPrismaService(),
  graphql: createGraphqlService(),
});

export type Services = typeof services;

export const services = createServices();
