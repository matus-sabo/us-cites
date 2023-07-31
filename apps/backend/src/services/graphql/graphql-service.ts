import { createService, useContext } from "#app";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { createGraphqlServerService } from "./graphql-server-service.js";
import { NodeModel } from "./schema/builder.js";

const MAX_CONNECTION_NODES = 100;

export const createGraphqlService = () => {
  const service = createService({
    name: "Graphql",
    start: async () => {
      const ctx = useContext();
      await ctx.call.manager.startServices([ctx.services.graphql.server]);
    },
    stop: async () => {},
  });

  const encodeNodeId = (type: keyof NodeModel, id: string) => {
    return Buffer.from(JSON.stringify({ type, id })).toString("base64");
  };

  const decodeNodeId = (input: string) => {
    return JSON.parse(Buffer.from(input, "base64").toString("ascii")) as {
      type: keyof NodeModel;
      id: string;
    };
  };

  const connectionArgs = <
    T extends {
      first?: number | null;
      last?: number | null;
      before?: string | null;
      after?: string | null;
    }
  >(
    args: T
  ): T => {
    const argsCopy = { ...args };
    if (
      typeof argsCopy.first !== "number" &&
      typeof argsCopy.last !== "number"
    ) {
      argsCopy.first = MAX_CONNECTION_NODES;
    }
    if (
      typeof argsCopy.first === "number" &&
      argsCopy.first > MAX_CONNECTION_NODES
    ) {
      argsCopy.first = MAX_CONNECTION_NODES;
    }
    if (
      typeof argsCopy.last === "number" &&
      argsCopy.last > MAX_CONNECTION_NODES
    ) {
      argsCopy.last = MAX_CONNECTION_NODES;
    }
    if (typeof argsCopy.first === "number" && argsCopy.first < 1) {
      argsCopy.first = 1;
    }
    if (typeof argsCopy.last === "number" && argsCopy.last < 1) {
      argsCopy.last = 1;
    }
    if (
      typeof argsCopy.first === "number" &&
      typeof argsCopy.last === "number"
    ) {
      throw new Error("Should not happen");
    }
    if (
      typeof argsCopy.before === "string" &&
      typeof argsCopy.after === "string"
    ) {
      throw new Error("Should not happen");
    }

    return argsCopy;
  };

  return {
    ...service,
    server: createGraphqlServerService(),
    call: {
      encodeNodeId,
      decodeNodeId,
      connectionArgs,
      cursorConnection: findManyCursorConnection,
    },
  };
};
