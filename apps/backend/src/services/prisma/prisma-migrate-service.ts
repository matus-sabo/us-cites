import { createService, useContext } from "#app";
import * as csv from "csv";
import fs from "fs";
import util from "util";
import * as uuid from "uuid";
import { CityData } from "./prisma-client";

type State = {
  id: string;
  name: string;
  shortName: string;
};

type StateTree = State & { counties: Map<string, CountyTree> };

type County = {
  id: string;
  name: string;
  fips: string;
  stateId: string;
};

type CountyTree = County & {
  cities: Map<string, City>;
};

type City = {
  id: string;
  externalId: string;
  name: string;
  data: CityData;
  stateId: string;
  countyId: string;
};

const csvToJson = util.promisify(
  (
    buffer: Buffer,
    callback: (err: Error | undefined, result: unknown) => void
  ) => {
    csv.parse(buffer, callback);
  }
);

export const createPrismaMigrateService = () => {
  const service = createService({
    name: "PrismaMigrate",
  });

  const migrateDeploy = async () => {
    const ctx = useContext();
    await ctx.call.utils.execWithLog("npx prisma migrate deploy", {
      log: service.log,
      shell: "bash",
      env: {
        ...process.env,
        DATABASE_URL: ctx.call.config.services.prisma.url,
      },
    });
  };

  const csvRowToObject = (input: string[]) => {
    const [
      city,
      cityAscii,
      stateId,
      stateName,
      countyFips,
      countyName,
      lat,
      lng,
      population,
      density,
      source,
      military,
      incorporated,
      timezone,
      ranking,
      zips,
      id,
    ] = input;
    const cityData = {
      lat,
      lng,
      population,
      density,
      source,
      military,
      incorporated,
      timezone,
      ranking,
      zips: zips.split(" "),
    };
    return {
      city,
      cityAscii,
      stateId,
      stateName,
      countyFips,
      countyName,
      cityData,
      id,
    };
  };

  const normalizeUsCities = async () => {
    const usCitiesCsvBuffer = await fs.promises.readFile("./etc/uscities.csv");
    const data = await csvToJson(usCitiesCsvBuffer);
    return (data as [...string[]][]).reduce(
      (prev, curr, index) => {
        if (index === 0) {
          return prev;
        }
        const row = csvRowToObject(curr);
        const state =
          prev.states.get(row.stateName) ??
          ({
            id: uuid.v4(),
            name: row.stateName,
            shortName: row.stateId,
          } satisfies State);
        prev.states.set(state.name, state);
        const county =
          prev.counties.get(row.countyName) ??
          ({
            id: uuid.v4(),
            name: row.countyName,
            fips: row.countyFips,
            stateId: state.id,
          } satisfies County);
        prev.counties.set(county.name, county);
        const city =
          prev.cities.get(row.city) ??
          ({
            id: uuid.v4(),
            name: row.city,
            externalId: row.id,
            data: row.cityData,
            stateId: state.id,
            countyId: county.id,
          } satisfies City);
        prev.cities.set(city.name, city);
        return prev;
      },
      {
        states: new Map<string, State>(),
        counties: new Map<string, County>(),
        cities: new Map<string, City>(),
      }
    );
  };

  /*
    ### 3. Transforming tree
    Next you will need to transform data into a tree format (State > County > City)
    * Write an algorithm that will output such tree.
    * What is the complexity of your algorithm (in big O notation) ?
    * 
     
    Complexitiy of this algorithm is O (N)
  */
  const transformingTree = async () => {
    const usCitiesCsvBuffer = await fs.promises.readFile("./etc/uscities.csv");
    const data = await csvToJson(usCitiesCsvBuffer);
    return (data as [...string[]][]).reduce((prev, curr, index) => {
      if (index === 0) {
        return prev;
      }
      const row = csvRowToObject(curr);
      const state =
        prev.get(row.stateName) ??
        ({
          id: uuid.v4(),
          name: row.stateName,
          shortName: row.stateId,
          counties: new Map<string, CountyTree>(),
        } satisfies StateTree);
      prev.set(state.name, state);
      const county =
        state.counties.get(row.countyName) ??
        ({
          id: uuid.v4(),
          name: row.countyName,
          fips: row.countyFips,
          stateId: state.id,
          cities: new Map<string, City>(),
        } satisfies CountyTree);
      state.counties.set(county.name, county);
      const city =
        county.cities.get(row.city) ??
        ({
          id: uuid.v4(),
          name: row.city,
          externalId: row.id,
          data: row.cityData,
          stateId: state.id,
          countyId: county.id,
        } satisfies City);
      county.cities.set(city.name, city);
      return prev;
    }, new Map<string, StateTree>());
  };

  const migrateSeed = async () => {
    const ctx = useContext();
    const stateCount = await ctx.call.prisma.state.count();
    if (stateCount === 0) {
      const { states, counties, cities } = await normalizeUsCities();
      await ctx.call.prisma.state.createMany({
        data: [...states.values()],
      });
      await ctx.call.prisma.county.createMany({
        data: [...counties.values()],
      });
      await ctx.call.prisma.city.createMany({
        data: [...cities.values()],
      });
    }
  };

  const migrate = async () => {
    await migrateDeploy();
    await migrateSeed();
  };

  return {
    ...service,
    migrate,
  };
};
