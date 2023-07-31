import { builder } from "../../schema/builder.js";

builder.interfaceType("Node", {
  resolveType: (parent, { ctx }) => {
    return parent.__typename;
  },
  fields: (t) => ({
    id: t.string({
      resolve: (parent, args, { ctx }) => {
        if (typeof parent.__typename !== "string") {
          throw new Error("Should not happen");
        }
        return ctx.call.graphql.encodeNodeId(parent.__typename, parent.id);
      },
    }),
    updatedAt: t.string({
      resolve: (parent) => {
        return new Date(parent.updatedAt).toISOString();
      },
    }),
    createdAt: t.string({
      resolve: (parent) => {
        return new Date(parent.createdAt).toISOString();
      },
    }),
  }),
});

builder.queryField("node", (t) =>
  t.field({
    type: "Node",
    nullable: true,
    args: { id: t.arg.string({ required: true }) },

    resolve: async (parent, args, { ctx }) => {
      console.log(args);
      const { type, id } = ctx.call.graphql.decodeNodeId(args.id);
      console.log(type, id);
      if (type === "State") {
        const node = await ctx.call.prisma.state.findUnique({ where: { id } });
        if (!node) {
          return null;
        }
        return {
          ...node,
          __typename: type,
        };
      }
      if (type === "County") {
        const node = await ctx.call.prisma.county.findUnique({ where: { id } });
        if (!node) {
          return null;
        }
        return {
          ...node,
          __typename: type,
        };
      }
      if (type === "City") {
        const node = await ctx.call.prisma.city.findUnique({ where: { id } });
        if (!node) {
          return null;
        }
        return {
          ...node,
          __typename: type,
        };
      }
    },
  })
);
