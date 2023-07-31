import { Text, TextProps } from "@chakra-ui/react";

export const TextElipsis = (props: TextProps) => (
  <Text
    textOverflow={"ellipsis"}
    overflow={"hidden"}
    whiteSpace={"nowrap"}
    {...props}
  />
);
