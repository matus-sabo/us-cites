import { Prisma } from "@prisma/client";
import { builder } from "../../schema/builder.js";
import {
  connectionArgs,
  connectionType,
} from "../../schema/connection-type.js";

builder.objectType("State", {
  interfaces: ["Node"],
  fields: (t) => ({
    id: t.string({
      resolve: (parent, args, { ctx }) => {
        return ctx.call.graphql.encodeNodeId("State", parent.id);
      },
    }),
    name: t.exposeString("name"),
    shortName: t.exposeString("shortName"),
  }),
});

connectionType("StateConnection", "State");

const StateConnectionFilterInput = builder.inputType(
  "StateConnectionFilterInput",
  {
    fields: (t) => ({
      nameContains: t.string(),
    }),
  }
);

builder.queryField("states", (t) =>
  t.field({
    type: "StateConnection",
    args: {
      ...connectionArgs(t.arg),
      filter: t.arg({ type: StateConnectionFilterInput }),
    },
    resolve: async (parent, args, { ctx }) => {
      const nameContains = args.filter?.nameContains;
      const baseArgs = {
        where: {
          name: nameContains
            ? {
                contains: nameContains,
                mode: "insensitive",
              }
            : undefined,
        },
        orderBy: { id: "asc" },
      } satisfies Prisma.StateFindManyArgs;
      const connection = await ctx.call.graphql.cursorConnection(
        (args) => ctx.call.prisma.state.findMany({ ...args, ...baseArgs }),
        () => ctx.call.prisma.state.count({ where: baseArgs.where }),
        ctx.call.graphql.connectionArgs(args),
        {
          getCursor: (record) => ({ id: record.id }),
          encodeCursor: (cursor) =>
            ctx.call.graphql.encodeNodeId("State", cursor.id),
          decodeCursor: (cursor) => ({
            id: ctx.call.graphql.decodeNodeId(cursor).id,
          }),
        }
      );
      return connection;
    },
  })
);
