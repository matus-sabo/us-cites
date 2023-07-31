"use client";
import { As, Button, ButtonProps, HStack, Icon, Text } from "@chakra-ui/react";

export interface NavButtonProps extends ButtonProps {
  icon: As;
  label: string;
}

export const NavButton = (props: NavButtonProps) => {
  const { icon, label, ...buttonProps } = props;
  return (
    <Button
      variant="ghost"
      justifyContent="start"
      width={"full"}
      {...buttonProps}
    >
      <HStack spacing="3">
        <Icon as={icon} boxSize="6" color="subtle" />
        <Text>{label}</Text>
      </HStack>
    </Button>
  );
};
