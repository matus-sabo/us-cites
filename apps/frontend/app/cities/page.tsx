"use client";
import { Pagination, PaginationState } from "@/components/Pagination";
import { TextColumn } from "@/components/TextColumn";
import { TextElipsis } from "@/components/TextEllipsis";
import {
  useCitiesQuery,
  useCountiesQuery,
  useStatesQuery,
} from "@/generated/urql";
import { usePagination } from "@/hooks/pagination";
import {
  Box,
  Button,
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
import { Select } from "chakra-react-select";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

export default function Cities() {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    first: 10,
    after: null,
    last: null,
    before: null,
  });
  const [nameContains, setNameContains] = useState<string | null>(null);
  const [state, setState] = useState<{ id: string; name: string } | null>(null);
  const [county, setCounty] = useState<{
    id: string;
    name: string;
    state: { id: string } | null;
  } | null>(null);
  const [stateNameContains, setStateNameContains] = useState<string | null>(
    null
  );
  const [countyNameContains, setCountyNameContains] = useState<string | null>(
    null
  );
  const [citiesQuery] = useCitiesQuery({
    variables: {
      ...paginationState,
      filter: {
        nameContains,
        stateId: state?.id ?? null,
        countyId: county?.id ?? null,
      },
    },
  });
  const [statesQuery] = useStatesQuery({
    variables: {
      ...paginationState,
      filter: { nameContains: stateNameContains },
    },
    pause: !stateNameContains,
  });
  const [countiesQuery] = useCountiesQuery({
    variables: {
      ...paginationState,
      filter: { nameContains: countyNameContains, stateId: state?.id ?? null },
    },
    pause: !countyNameContains,
  });
  if (!citiesQuery.data) {
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
  const selectCountyOptions = countyNameContains
    ? countiesQuery.data?.counties.nodes.map((county) => ({
        label: county.name,
        value: {
          id: county.id,
          name: county.name,
          state: county.state ? { id: county.state.id } : null,
        },
      })) ?? []
    : [];
  const nodes = citiesQuery.data.cities.nodes;
  const pageInfo = citiesQuery.data.cities.pageInfo;
  const totalCount = citiesQuery.data.cities.totalCount;
  const { onNext, onPrevious } = usePagination({
    setPaginationState,
    pageInfo,
    paginationState,
    nodesCount: nodes.length,
  });
  const templateColumns = "1fr 1fr 1fr 1fr 1fr";
  return (
    <Box>
      <Stack>
        <Heading as="h1" size="xs">
          Cities
        </Heading>
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
                if (value && county && value.value.id !== county.state?.id) {
                  setCounty(null);
                }
              }}
              onInputChange={(newValue) => {
                setStateNameContains(newValue || null);
              }}
              options={selectStateOptions}
            />
            <Select
              placeholder="Fitler by county"
              isMulti={false}
              isClearable={true}
              value={county ? { label: county.name, value: county } : null}
              onChange={(value) => {
                setCounty(value?.value ?? null);
              }}
              onInputChange={(newValue) => {
                setCountyNameContains(newValue || null);
              }}
              options={selectCountyOptions}
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
            <TextColumn>External ID</TextColumn>
            <TextColumn>State</TextColumn>
            <TextColumn>County</TextColumn>
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
                <TextElipsis>{node.externalId}</TextElipsis>
                <TextElipsis>{node.state?.name}</TextElipsis>
                <TextElipsis>{node.county?.name}</TextElipsis>
                <Stack align={"end"}>
                  <Link href={`/cities/${node.id}`}>
                    <Button
                      variant={"outline"}
                      leftIcon={<Icon as={FiEye}></Icon>}
                    >
                      Detail
                    </Button>
                  </Link>
                </Stack>
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
