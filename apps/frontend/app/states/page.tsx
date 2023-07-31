"use client";
import { Pagination, PaginationState } from "@/components/Pagination";
import { TextColumn } from "@/components/TextColumn";
import { TextElipsis } from "@/components/TextEllipsis";
import { useStatesQuery } from "@/generated/urql";
import { usePagination } from "@/hooks/pagination";
import {
  Box,
  Center,
  CloseButton,
  Container,
  Divider,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function States() {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    first: 10,
    after: null,
    last: null,
    before: null,
  });
  const [nameContains, setNameContains] = useState<string | null>(null);
  const [statesQuery] = useStatesQuery({
    variables: { ...paginationState, filter: { nameContains } },
  });
  if (!statesQuery.data) {
    return (
      <Center>
        <Spinner size={"xl"} />
      </Center>
    );
  }
  const nodes = statesQuery.data.states.nodes;
  const pageInfo = statesQuery.data.states.pageInfo;
  const totalCount = statesQuery.data.states.totalCount;
  const { onNext, onPrevious } = usePagination({
    setPaginationState,
    pageInfo,
    paginationState,
    nodesCount: nodes.length,
  });
  const templateColumns = "1fr 1fr";
  return (
    <Box>
      <Stack>
        <Heading as="h1" size="xs">
          States
        </Heading>
        <Box />
        <Stack
          direction={{ base: "column", md: "row" }}
          justify={{ base: undefined, md: "end" }}
        >
          <InputGroup maxWidth={{ base: undefined, md: "sm" }}>
            <Input
              value={nameContains ?? ""}
              onChange={(e) => {
                const value = e.target.value || null;
                setNameContains(value);
              }}
              placeholder="Search by name"
            />
            <InputRightElement>
              {nameContains ? (
                <CloseButton
                  size={"sm"}
                  onClick={() => {
                    setNameContains(null);
                  }}
                />
              ) : (
                <Icon as={FaSearch} />
              )}
            </InputRightElement>
          </InputGroup>
        </Stack>
        <Box />
      </Stack>
      <Container
        borderColor={"gray.300"}
        borderWidth="1px"
        rounded={"lg"}
        py={{ base: "4", md: "8" }}
      >
        <Stack>
          <SimpleGrid
            alignItems={"center"}
            gap={"4"}
            templateColumns={templateColumns}
          >
            <TextColumn>Name</TextColumn>
            <TextColumn>Short name</TextColumn>
          </SimpleGrid>

          {nodes.map((node) => (
            <Box key={node.id}>
              <Divider />
              <SimpleGrid
                pt={"2"}
                alignItems={"center"}
                gap={"4"}
                templateColumns={templateColumns}
              >
                <TextElipsis>{node.name}</TextElipsis>
                <TextElipsis>{node.shortName}</TextElipsis>
              </SimpleGrid>
            </Box>
          ))}
          <Divider />
        </Stack>
        <Box pt={{ base: "4", md: "8" }}>
          <Pagination
            onNext={onNext}
            onPrevious={onPrevious}
            setPaginationState={setPaginationState}
            paginationState={paginationState}
            totalCount={totalCount}
            pageInfo={pageInfo}
          />
        </Box>
      </Container>
    </Box>
  );
}
