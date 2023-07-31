"use client";
import { Stat } from "@/components/Stat";
import {
  useCitiesQuery,
  useCountiesQuery,
  useStatesQuery,
} from "@/generated/urql";
import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";

export default function Home() {
  const [statesQuery] = useStatesQuery({ variables: { first: 1 } });
  const [countiesQuery] = useCountiesQuery({ variables: { first: 1 } });
  const [citiesQuery] = useCitiesQuery({ variables: { first: 1 } });

  const isLoaded =
    !!statesQuery.data && !!countiesQuery.data && !!citiesQuery.data;

  if (!isLoaded) {
    return (
      <Center>
        <Spinner size={"xl"} />
      </Center>
    );
  }

  const stats = [
    { label: "States", value: statesQuery.data?.states.totalCount ?? 0 },
    { label: "Counties", value: countiesQuery.data?.counties.totalCount ?? 0 },
    { label: "Cities", value: citiesQuery.data?.cities.totalCount ?? 0 },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 5, md: 6 }}>
      {stats.map(({ label, value }) => (
        <Stat key={label} label={label} value={value.toString()} />
      ))}
    </SimpleGrid>
  );
}
