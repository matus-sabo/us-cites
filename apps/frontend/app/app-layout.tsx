"use client";
import { Sidebar } from "@/components/Sidebar";
import { Container, Flex } from "@chakra-ui/react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex as="section" minH="100vh" bg="bg-canvas">
      <Sidebar />
      <Container py={{ base: "2", md: "4" }} height={"full"}>
        {children}
      </Container>
    </Flex>
  );
}
