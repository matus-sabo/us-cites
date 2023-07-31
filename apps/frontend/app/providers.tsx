"use client";
import { theme } from "@/theme";
import { ApiProvider } from "@/urql/api";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource-variable/open-sans";
import "@fontsource-variable/spline-sans";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ApiProvider>{children}</ApiProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
