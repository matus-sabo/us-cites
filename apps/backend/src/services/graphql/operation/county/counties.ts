import { Prisma } from "@prisma/client";
import { builder } from "../../schema/builder.js";
import {
  connectionArgs,
  connectionType,
} from "../../schema/connection-type.js";

builder.objectType("County", {
  interfaces: ["Node"],
  fields: (t) => ({
    id: t.string({
      resolve: (parent, args, { ctx }) => {
        return ctx.call.graphql.encodeNodeId("County", parent.id);
      },
    }),
    name: t.exposeString("name"),
    fips: t.exposeString("fips"),
    state: t.field({
      type: "State",
      nullable: true,
      resolve: async (parent, args, { ctx }) => {
        return ctx.call.prisma.state.findUnique({
          where: { id: parent.stateId },
        });
      },
    }),
  }),
});

connectionType("CountyConnection", "County");

const CountyConnectionFilterInput = builder.inputType(
  "CountyConnectionFilterInput",
  {
    fields: (t) => ({
      nameContains: t.string(),
      stateId: t.string(),
    }),
  }
);

builder.queryField("counties", (t) =>
  t.field({
    type: "CountyConnection",
    args: {
      ...connectionArgs(t.arg),
      filter: t.arg({ type: CountyConnectionFilterInput }),
    },
    resolve: async (parent, args, { ctx }) => {
      const nameContains = args.filter?.nameContains ?? undefined;
      const stateId = args.filter?.stateId
        ? ctx.call.graphql.decodeNodeId(args.filter.stateId).id
        : undefined;
      const baseArgs = {
        where: {
          name: nameContains
            ? {
                contains: nameContains,
                mode: "insensitive",
              }
            : undefined,
          stateId,
        },
        orderBy: { id: "asc" },
      } satisfies Prisma.CountyFindManyArgs;
      const connection = await ctx.call.graphql.cursorConnection(
        (args) => ctx.call.prisma.county.findMany({ ...args, ...baseArgs }),
        () => ctx.call.prisma.county.count({ where: baseArgs.where }),
        ctx.call.graphql.connectionArgs(args),
        {
          getCursor: (record) => ({ id: record.id }),
          encodeCursor: (cursor) =>
            ctx.call.graphql.encodeNodeId("County", cursor.id),
          decodeCursor: (cursor) => ({
            id: ctx.call.graphql.decodeNodeId(cursor).id,
          }),
        }
      );
      return connection;
    },
  })
);
