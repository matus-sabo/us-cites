import { Text, TextProps } from "@chakra-ui/react";

export const TextColumn = (props: TextProps) => (
  <Text
    fontWeight={"bold"}
    fontSize={"xs"}
    textTransform={"uppercase"}
    {...props}
  />
);
