import { builder } from "../../schema/builder.js";

builder.objectType("CityData", {
  fields: (t) => ({
    lat: t.exposeString("lat", { nullable: true }),
    lng: t.exposeString("lng", { nullable: true }),
    population: t.exposeString("population", { nullable: true }),
    density: t.exposeString("density", { nullable: true }),
    source: t.exposeString("source", { nullable: true }),
    military: t.exposeString("military", { nullable: true }),
    incorporated: t.exposeString("incorporated", { nullable: true }),
    timezone: t.exposeString("timezone", { nullable: true }),
    ranking: t.exposeString("ranking", { nullable: true }),
    zips: t.exposeStringList("zips", { nullable: true }),
  }),
});
