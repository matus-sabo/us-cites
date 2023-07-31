import { Client, Provider, cacheExchange, fetchExchange } from "urql";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL ENV");
}

const client = new Client({
  url: process.env.NEXT_PUBLIC_API_URL,
  exchanges: [cacheExchange, fetchExchange],
});

export interface ApiProviderProps {
  children: React.ReactNode;
}

export const ApiProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider value={client}>{children}</Provider>
);
