import { Box, BoxProps } from "@chakra-ui/react";

export const BoxDetialValue = (props: BoxProps) => (
  <Box width={"full"} maxW={{ md: "3xl" }} {...props} />
);
