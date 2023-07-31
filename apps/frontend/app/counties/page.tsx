"use client";
import { Pagination, PaginationState } from "@/components/Pagination";
import { TextColumn } from "@/components/TextColumn";
import { TextElipsis } from "@/components/TextEllipsis";
import { useCountiesQuery, useStatesQuery } from "@/generated/urql";
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

import { Select } from "chakra-react-select";

export default function Counties() {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    first: 10,
    after: null,
    last: null,
    before: null,
  });
  const [nameContains, setNameContains] = useState<string | null>(null);
  const [state, setState] = useState<{ id: string; name: string } | null>(null);
  const [stateNameContains, setStateNameContains] = useState<string | null>(
    null
  );
  const [countiesQuery] = useCountiesQuery({
    variables: {
      ...paginationState,
      filter: { nameContains, stateId: state?.id ?? null },
    },
  });
  const [statesQuery] = useStatesQuery({
    variables: {
      ...paginationState,
      filter: { nameContains: stateNameContains },
    },
    pause: !stateNameContains,
  });
  if (!countiesQuery.data) {
    return (
      <Center>
        <Spinner size={"xl"} />
      </Center>
    );
  }
  const selectStateOptions = stateNameContains
    ? statesQuery.data?.states.nodes.map((state) => ({
        label: state.name,
        value: { id: state.id, name: state.name },
      })) ?? []
    : [];
  const nodes = countiesQuery.data.counties.nodes;
  const pageInfo = countiesQuery.data.counties.pageInfo;
  const totalCount = countiesQuery.data.counties.totalCount;
  const { onNext, onPrevious } = usePagination({
    setPaginationState,
    pageInfo,
    paginationState,
    nodesCount: nodes.length,
  });
  const templateColumns = "1fr 1fr 1fr";
  return (
    <Box>
      <Stack>
        <Heading as="h1" size="xs">
          Counties
        </Heading>
        <Box />
        <Stack
          direction={{ base: "column", md: "row" }}
          justify={{ base: undefined, md: "space-between" }}
          align={{ base: undefined, md: "end" }}
        >
          <Stack width={{ base: undefined, md: "sm" }}>
            <Select
              placeholder="Fitler by state"
              isMulti={false}
              isClearable={true}
              value={state ? { label: state.name, value: state } : null}
              onChange={(value) => {
                setState(value?.value ?? null);
              }}
              onInputChange={(newValue) => {
                setStateNameContains(newValue || null);
              }}
              options={selectStateOptions}
            />
          </Stack>
          <InputGroup maxWidth={{ base: undefined, md: "sm" }}>
            <Input
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
            <TextColumn>FIPS</TextColumn>
            <TextColumn>State</TextColumn>
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
                <TextElipsis>{node.fips}</TextElipsis>
                <TextElipsis>{node.state?.name}</TextElipsis>
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
