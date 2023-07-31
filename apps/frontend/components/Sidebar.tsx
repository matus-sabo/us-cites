"use client";
import { Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaCity, FaMapSigns, FaSitemap } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { NavButton } from "./NavButton";

export const Sidebar = () => {
  return (
    <Flex
      flex="1"
      bg="bg-surface"
      boxShadow={"sm"}
      minWidth={"52"}
      maxWidth={"52"}
      py={{ base: "6", sm: "8" }}
      px={{ base: "4", sm: "6" }}
    >
      <Stack justify="space-between" spacing="1" width={"full"}>
        <Stack spacing="8" shouldWrapChildren>
          <Text fontSize={"xx-large"} fontWeight={"bold"} color={"brand.600"}>
            US cities
          </Text>
          <Stack spacing="1">
            <Link href={"/"}>
              <NavButton label="Home" icon={FiHome} />
            </Link>
          </Stack>
          <Stack>
            <Link href={"/states"}>
              <NavButton label="States" icon={FaSitemap} aria-current="page" />
            </Link>
            <Link href={"/counties"}>
              <NavButton
                label="Counties"
                icon={FaMapSigns}
                aria-current="page"
              />
            </Link>
            <Link href={"/cities"}>
              <NavButton label="Cities" icon={FaCity} aria-current="page" />
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
};
