import { Prisma } from "@prisma/client";
import { builder } from "../../schema/builder.js";
import {
  connectionArgs,
  connectionType,
} from "../../schema/connection-type.js";

builder.objectType("City", {
  interfaces: ["Node"],
  fields: (t) => ({
    id: t.string({
      resolve: (parent, args, { ctx }) => {
        return ctx.call.graphql.encodeNodeId("City", parent.id);
      },
    }),
    name: t.exposeString("name"),
    externalId: t.exposeString("externalId"),
    data: t.expose("data", { type: "CityData" }),
    state: t.field({
      type: "State",
      nullable: true,
      resolve: async (parent, args, { ctx }) => {
        return ctx.call.prisma.state.findUnique({
          where: { id: parent.stateId },
        });
      },
    }),
    county: t.field({
      type: "County",
      nullable: true,
      resolve: async (parent, args, { ctx }) => {
        return ctx.call.prisma.county.findUnique({
          where: { id: parent.countyId },
        });
      },
    }),
  }),
});

connectionType("CityConnection", "City");

const CityConnectionFilterInput = builder.inputType(
  "CityConnectionFilterInput",
  {
    fields: (t) => ({
      nameContains: t.string(),
      stateId: t.string(),
      countyId: t.string(),
    }),
  }
);

builder.queryField("cities", (t) =>
  t.field({
    type: "CityConnection",
    args: {
      ...connectionArgs(t.arg),
      filter: t.arg({ type: CityConnectionFilterInput }),
    },
    resolve: async (parent, args, { ctx }) => {
      const nameContains = args.filter?.nameContains ?? undefined;
      const stateId = args.filter?.stateId
        ? ctx.call.graphql.decodeNodeId(args.filter.stateId).id
        : undefined;
      const countyId = args.filter?.countyId
        ? ctx.call.graphql.decodeNodeId(args.filter.countyId).id
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
          countyId,
        },
        orderBy: { id: "asc" },
      } satisfies Prisma.CityFindManyArgs;
      const connection = await ctx.call.graphql.cursorConnection(
        (args) => ctx.call.prisma.city.findMany({ ...args, ...baseArgs }),
        () => ctx.call.prisma.city.count({ where: baseArgs.where }),
        ctx.call.graphql.connectionArgs(args),
        {
          getCursor: (record) => ({ id: record.id }),
          encodeCursor: (cursor) =>
            ctx.call.graphql.encodeNodeId("City", cursor.id),
          decodeCursor: (cursor) => ({
            id: ctx.call.graphql.decodeNodeId(cursor).id,
          }),
        }
      );
      return connection;
    },
  })
);
