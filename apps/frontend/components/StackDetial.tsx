import { Stack, StackProps } from "@chakra-ui/react";

export const StackDetail = (props: StackProps) => (
  <Stack
    direction={{ base: "column", md: "row" }}
    spacing={{ base: "1.5", md: "8" }}
    justify="space-between"
    {...props}
  />
);
