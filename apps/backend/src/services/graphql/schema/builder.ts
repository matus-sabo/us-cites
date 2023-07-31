import { Context as AppContext } from "#app";
import SchemaBuilder from "@pothos/core";
import { CityData, PrismaModel } from "../../prisma/prisma-client";

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
};

export type ConnectionType<T> = {
  nodes: T[];
  edges: {
    node: T;
    cursor: string;
  }[];
  pageInfo: PageInfo;
  totalCount: number;
};

type NodeInterface = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  __typename?: keyof NodeModel;
};

type Interfaces = {
  Node: NodeInterface;
};

export type NodeModel = {
  State: PrismaModel["state"];
  County: PrismaModel["county"];
  City: PrismaModel["city"];
};

export type ConnectionObjects = {
  StateConnection: ConnectionType<PrismaModel["state"]>;
  CountyConnection: ConnectionType<PrismaModel["county"]>;
  CityConnection: ConnectionType<PrismaModel["city"]>;
};

interface Objects extends NodeModel, ConnectionObjects {
  ConnectionPageInfo: PageInfo;
  CityData: CityData;
}

type Context = {
  ctx: AppContext;
};

export type GraphqlSchema = {
  Interfaces: Interfaces;
  Objects: Objects;
  Context: Context;
};

export const builder = new SchemaBuilder<GraphqlSchema>({});

builder.queryType({});
// builder.mutationType({});
// builder.subscriptionType({});
