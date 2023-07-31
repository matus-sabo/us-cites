import { createService, useContext } from "#app";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { builder } from "./schema/builder.js";

import "./operation/city/cities.js";
import "./operation/city/city.js";
import "./operation/county/counties.js";
import "./operation/node/node.js";
import "./operation/state/states.js";

export const createGraphqlServerService = () => {
  const server = new ApolloServer({
    schema: builder.toSchema(),
  });
  const service = createService({
    name: "GraphqlServer",
    start: async () => {
      const ctx = useContext();
      await ctx.call.manager.startServices([ctx.services.prisma]);
      const { url } = await startStandaloneServer(server, {
        context: async (req) => {
          const graphqlCtx = useContext({ storage: {} });
          return {
            ctx: graphqlCtx,
          };
        },
        listen: { port: ctx.call.config.services.graphql.port },
      });
      service.log.info(`Apollo server url ${url}`);
    },
    stop: async () => {
      await server.stop();
    },
  });
  return {
    ...service,
  };
};
