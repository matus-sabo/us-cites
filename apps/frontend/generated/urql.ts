import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type City = Node & {
  __typename?: 'City';
  county?: Maybe<County>;
  createdAt: Scalars['String']['output'];
  data: CityData;
  externalId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  state?: Maybe<State>;
  updatedAt: Scalars['String']['output'];
};

export type CityConnection = {
  __typename?: 'CityConnection';
  edges: Array<CityConnectionEdge>;
  nodes: Array<City>;
  pageInfo: ConnectionPageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CityConnectionEdge = {
  __typename?: 'CityConnectionEdge';
  cursor: Scalars['String']['output'];
  node: City;
};

export type CityConnectionFilterInput = {
  countyId?: InputMaybe<Scalars['String']['input']>;
  nameContains?: InputMaybe<Scalars['String']['input']>;
  stateId?: InputMaybe<Scalars['String']['input']>;
};

export type CityData = {
  __typename?: 'CityData';
  density?: Maybe<Scalars['String']['output']>;
  incorporated?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['String']['output']>;
  lng?: Maybe<Scalars['String']['output']>;
  military?: Maybe<Scalars['String']['output']>;
  population?: Maybe<Scalars['String']['output']>;
  ranking?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  zips?: Maybe<Array<Scalars['String']['output']>>;
};

export type ConnectionPageInfo = {
  __typename?: 'ConnectionPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type County = Node & {
  __typename?: 'County';
  createdAt: Scalars['String']['output'];
  fips: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  state?: Maybe<State>;
  updatedAt: Scalars['String']['output'];
};

export type CountyConnection = {
  __typename?: 'CountyConnection';
  edges: Array<CountyConnectionEdge>;
  nodes: Array<County>;
  pageInfo: ConnectionPageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CountyConnectionEdge = {
  __typename?: 'CountyConnectionEdge';
  cursor: Scalars['String']['output'];
  node: County;
};

export type CountyConnectionFilterInput = {
  nameContains?: InputMaybe<Scalars['String']['input']>;
  stateId?: InputMaybe<Scalars['String']['input']>;
};

export type Node = {
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  cities: CityConnection;
  counties: CountyConnection;
  node?: Maybe<Node>;
  states: StateConnection;
};


export type QueryCitiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<CityConnectionFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCountiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<CountyConnectionFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNodeArgs = {
  id: Scalars['String']['input'];
};


export type QueryStatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<StateConnectionFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type State = Node & {
  __typename?: 'State';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type StateConnection = {
  __typename?: 'StateConnection';
  edges: Array<StateConnectionEdge>;
  nodes: Array<State>;
  pageInfo: ConnectionPageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StateConnectionEdge = {
  __typename?: 'StateConnectionEdge';
  cursor: Scalars['String']['output'];
  node: State;
};

export type StateConnectionFilterInput = {
  nameContains?: InputMaybe<Scalars['String']['input']>;
};

export type CitiesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<CityConnectionFilterInput>;
}>;


export type CitiesQuery = { __typename?: 'Query', cities: { __typename?: 'CityConnection', totalCount: number, nodes: Array<{ __typename?: 'City', id: string, name: string, externalId: string, state?: { __typename?: 'State', id: string, name: string } | null, county?: { __typename?: 'County', id: string, name: string } | null }>, pageInfo: { __typename?: 'ConnectionPageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type CityQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CityQuery = { __typename?: 'Query', node?: { __typename?: 'City', id: string, name: string, externalId: string, data: { __typename?: 'CityData', lat?: string | null, lng?: string | null, population?: string | null, density?: string | null, source?: string | null, military?: string | null, incorporated?: string | null, timezone?: string | null, ranking?: string | null, zips?: Array<string> | null }, state?: { __typename?: 'State', id: string, name: string } | null, county?: { __typename?: 'County', id: string, name: string } | null } | { __typename?: 'County' } | { __typename?: 'State' } | null };

export type CountiesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<CountyConnectionFilterInput>;
}>;


export type CountiesQuery = { __typename?: 'Query', counties: { __typename?: 'CountyConnection', totalCount: number, nodes: Array<{ __typename?: 'County', id: string, name: string, fips: string, state?: { __typename?: 'State', id: string, name: string } | null }>, pageInfo: { __typename?: 'ConnectionPageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type ConnectionPageInfoFragment = { __typename?: 'ConnectionPageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null };

export type StatesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<StateConnectionFilterInput>;
}>;


export type StatesQuery = { __typename?: 'Query', states: { __typename?: 'StateConnection', totalCount: number, nodes: Array<{ __typename?: 'State', id: string, name: string, shortName: string }>, pageInfo: { __typename?: 'ConnectionPageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export const ConnectionPageInfoFragmentDoc = gql`
    fragment ConnectionPageInfo on ConnectionPageInfo {
  hasNextPage
  hasPreviousPage
  startCursor
  endCursor
}
    `;
export const CitiesDocument = gql`
    query Cities($first: Int, $last: Int, $before: String, $after: String, $filter: CityConnectionFilterInput) {
  cities(
    first: $first
    after: $after
    last: $last
    before: $before
    filter: $filter
  ) {
    nodes {
      id
      name
      externalId
      state {
        id
        name
      }
      county {
        id
        name
      }
    }
    pageInfo {
      ...ConnectionPageInfo
    }
    totalCount
  }
}
    ${ConnectionPageInfoFragmentDoc}`;

export function useCitiesQuery(options?: Omit<Urql.UseQueryArgs<CitiesQueryVariables>, 'query'>) {
  return Urql.useQuery<CitiesQuery, CitiesQueryVariables>({ query: CitiesDocument, ...options });
};
export const CityDocument = gql`
    query City($id: String!) {
  node(id: $id) {
    ... on City {
      id
      name
      externalId
      data {
        lat
        lng
        population
        density
        source
        military
        incorporated
        timezone
        ranking
        zips
      }
      state {
        id
        name
      }
      county {
        id
        name
      }
    }
  }
}
    `;

export function useCityQuery(options: Omit<Urql.UseQueryArgs<CityQueryVariables>, 'query'>) {
  return Urql.useQuery<CityQuery, CityQueryVariables>({ query: CityDocument, ...options });
};
export const CountiesDocument = gql`
    query Counties($first: Int, $last: Int, $before: String, $after: String, $filter: CountyConnectionFilterInput) {
  counties(
    first: $first
    after: $after
    last: $last
    before: $before
    filter: $filter
  ) {
    nodes {
      id
      name
      fips
      state {
        id
        name
      }
    }
    pageInfo {
      ...ConnectionPageInfo
    }
    totalCount
  }
}
    ${ConnectionPageInfoFragmentDoc}`;

export function useCountiesQuery(options?: Omit<Urql.UseQueryArgs<CountiesQueryVariables>, 'query'>) {
  return Urql.useQuery<CountiesQuery, CountiesQueryVariables>({ query: CountiesDocument, ...options });
};
export const StatesDocument = gql`
    query States($first: Int, $last: Int, $before: String, $after: String, $filter: StateConnectionFilterInput) {
  states(
    first: $first
    after: $after
    last: $last
    before: $before
    filter: $filter
  ) {
    nodes {
      id
      name
      shortName
    }
    pageInfo {
      ...ConnectionPageInfo
    }
    totalCount
  }
}
    ${ConnectionPageInfoFragmentDoc}`;

export function useStatesQuery(options?: Omit<Urql.UseQueryArgs<StatesQueryVariables>, 'query'>) {
  return Urql.useQuery<StatesQuery, StatesQueryVariables>({ query: StatesDocument, ...options });
};