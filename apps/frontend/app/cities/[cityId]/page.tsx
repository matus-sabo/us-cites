"use client";
import { BoxDetialValue } from "@/components/BoxDetialValue";
import { StackDetail } from "@/components/StackDetial";
import { TextDetailName } from "@/components/TextDetialName";
import { useCityQuery } from "@/generated/urql";
import {
  Box,
  Center,
  Container,
  HStack,
  Heading,
  Spinner,
  Stack,
  StackDivider,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

export default function CityDetail({ params }: { params: { cityId: string } }) {
  const cityId = decodeURIComponent(params.cityId);
  const [cityQuery] = useCityQuery({ variables: { id: cityId } });
  if (!cityQuery.data) {
    return (
      <Center>
        <Spinner size={"xl"} />
      </Center>
    );
  }
  const city =
    cityQuery.data?.node?.__typename === "City" ? cityQuery.data.node : null;
  if (!city) {
    return <Text>Not found</Text>;
  }

  /* 
lat,
      lng,
      population,
      density,
      source,
      military,
      incorporated,
      timezone,
      ranking,
      zips: zips.split
      */

  return (
    <Box>
      <Stack>
        <Heading as="h1" size="xs">
          City {city.name}
        </Heading>
        <Box />
      </Stack>
      <Container
        borderColor={"gray.300"}
        borderWidth="1px"
        rounded={"lg"}
        py={{ base: "4", md: "8" }}
      >
        <Stack spacing="2" divider={<StackDivider />}>
          <StackDetail>
            <TextDetailName>External ID</TextDetailName>
            <BoxDetialValue>
              <Text>{city.externalId}</Text>
            </BoxDetialValue>
          </StackDetail>
          <StackDetail>
            <TextDetailName>State</TextDetailName>
            <BoxDetialValue>
              <Text>{city.state?.name}</Text>
            </BoxDetialValue>
          </StackDetail>
          <StackDetail>
            <TextDetailName>County</TextDetailName>
            <BoxDetialValue>
              <Text>{city.county?.name}</Text>
            </BoxDetialValue>
          </StackDetail>
          <StackDetail>
            <TextDetailName>Location</TextDetailName>
            <BoxDetialValue>
              <HStack spacing={"6"}>
                <Text>Latitude: {city.data.lat}</Text>
                <Text>Longitude: {city.data.lng}</Text>
              </HStack>
            </BoxDetialValue>
          </StackDetail>
          <StackDetail>
            <TextDetailName>Population</TextDetailName>
            <BoxDetialValue>
              <Text>{city.data.population}</Text>
            </BoxDetialValue>
          </StackDetail>
          <StackDetail>
            <TextDetailName>Density</TextDetailName>
            <BoxDetialValue>
              <Text>{city.data.density}</Text>
            </BoxDetialValue>
          </StackDetail>
          <StackDetail>
            <TextDetailName>Military</TextDetailName>
            <BoxDetialValue>
              <Text>{city.data.military}</Text>
            </BoxDetialValue>
          </StackDetail>
          <StackDetail>
            <TextDetailName>Incorporated</TextDetailName>
            <BoxDetialValue>
              <Text>{city.data.incorporated}</Text>
            </BoxDetialValue>
          </StackDetail>
          <StackDetail>
            <TextDetailName>Timezone</TextDetailName>
            <BoxDetialValue>
              <Text>{city.data.timezone}</Text>
            </BoxDetialValue>
          </StackDetail>
          <StackDetail>
            <TextDetailName>Ranking</TextDetailName>
            <BoxDetialValue>
              <Text>{city.data.ranking}</Text>
            </BoxDetialValue>
          </StackDetail>
          <StackDetail>
            <TextDetailName>Zips</TextDetailName>
            <BoxDetialValue>
              <Wrap>
                {city.data.zips?.map((zip) => (
                  <WrapItem>
                    <Tag>{zip}</Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </BoxDetialValue>
          </StackDetail>
        </Stack>
      </Container>
    </Box>
  );
}
