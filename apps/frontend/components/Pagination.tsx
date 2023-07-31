"use client";
import { Button, ButtonGroup, Select, Stack, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

export interface PaginationState {
  first: number | null;
  last: number | null;
  before: string | null;
  after: string | null;
}

export interface PaginationProps {
  onNext: () => void;
  onPrevious: () => void;
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  setPaginationState: Dispatch<SetStateAction<PaginationState>>;
  paginationState: PaginationState;
  totalCount: number;
}
export const Pagination = ({
  onNext,
  onPrevious,
  setPaginationState,
  paginationState,
  pageInfo,
  totalCount,
}: PaginationProps) => {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      spacing="3"
      justify={{ base: undefined, md: "space-between" }}
      align={{ base: undefined, md: "center" }}
    >
      <Stack>
        <Text color="muted" fontSize="sm" wordBreak={"break-word"}>
          Items per page
        </Text>
        <Select
          width={"20"}
          defaultValue={String(paginationState?.first ?? paginationState?.last)}
          onChange={(e) => {
            setPaginationState((prev) => ({
              ...prev,
              first: prev.first ? Number(e.target.value) : null,
              last: prev.last ? Number(e.target.value) : null,
            }));
          }}
        >
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </Select>
      </Stack>

      <Text color="muted" fontSize="sm" wordBreak={"break-word"}>
        {`Paginating over ${totalCount} results`}
      </Text>

      <ButtonGroup
        spacing="3"
        justifyContent="space-between"
        variant="secondary"
      >
        <Button
          width={"24"}
          isDisabled={!pageInfo.hasPreviousPage}
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          width={"24"}
          isDisabled={!pageInfo.hasNextPage}
          onClick={onNext}
        >
          Next
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
