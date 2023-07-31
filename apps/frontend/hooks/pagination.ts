import { PaginationState } from "@/components/Pagination";
import { ConnectionPageInfo } from "@/generated/urql";
import { Dispatch, SetStateAction } from "react";

export const usePagination = ({
  setPaginationState,
  pageInfo,
  paginationState,
  nodesCount,
}: {
  setPaginationState: Dispatch<SetStateAction<PaginationState>>;
  pageInfo: ConnectionPageInfo;
  paginationState: PaginationState;
  nodesCount: number;
}) => {
  const onNext = () => {
    setPaginationState((prev) => ({
      ...prev,
      first: prev.first ?? prev.last,
      after: pageInfo?.endCursor ?? null,
      last: null,
      before: null,
    }));
  };
  const onPrevious = () => {
    setPaginationState((prev) => ({
      ...prev,
      first: null,
      after: null,
      last: prev.first ?? prev.last,
      before: pageInfo?.startCursor ?? null,
    }));
  };
  if (paginationState.before && !pageInfo.hasPreviousPage) {
    setPaginationState((prev) => ({
      first: prev.first ?? prev.last,
      after: null,
      last: null,
      before: null,
    }));
  }
  if (nodesCount === 0) {
    if (paginationState.before) {
      onNext();
    }
    if (paginationState.after) {
      onPrevious();
    }
  }

  return {
    onNext,
    onPrevious,
  };
};
