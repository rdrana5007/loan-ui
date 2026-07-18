"use client";
import { TableProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, FILTER_KEYS } from "@/constants";
import { EmiFollowUpListParams, EmiFollowUpRow, EmiFollowUpStatusFilter } from "@/types";
import { useEmiFollowUpsByLoanQuery } from "@/api";

const { STATUS } = FILTER_KEYS;

interface UseEmiFollowUpListingParams {
  loanId: string | number | null;
}

export const useEmiFollowUpListing = ({
  loanId,
}: UseEmiFollowUpListingParams) => {
  const [statusFilter, setStatusFilter] =
    useState<EmiFollowUpStatusFilter>("all");
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_PAGE_SIZE);

  const listParams = useMemo((): EmiFollowUpListParams => {
    const params: EmiFollowUpListParams = {
      page,
      pageSize: rowsPerPage,
    };

    if (statusFilter && statusFilter !== "all") {
      params.status = statusFilter;
    }

    return params;
  }, [page, rowsPerPage, statusFilter]);

  const id = Number(loanId);
  const { data: queryData, isLoading, refetch } = useEmiFollowUpsByLoanQuery(id, listParams);

  const data = queryData?.items ?? [];
  const pageInfo = queryData?.page_info;

  const pagination = useMemo(
    () => ({
      current: pageInfo?.current_page ?? page,
      pageSize: pageInfo?.page_size ?? rowsPerPage,
      total: pageInfo?.total_count ?? data.length,
    }),
    [pageInfo, page, rowsPerPage, data],
  );

  const handleTableChange: TableProps<EmiFollowUpRow>["onChange"] = useCallback(
    (pagination: any) => {
      setPage(pagination.current ?? DEFAULT_PAGE);
      setRowsPerPage(pagination.pageSize ?? DEFAULT_PAGE_SIZE);
    },
    [],
  );

  const handleFilterChange = useCallback(
    (name: string, value: string | undefined) => {
      if (name === STATUS && typeof value === "string") {
        setStatusFilter(value as EmiFollowUpStatusFilter);
        setPage(DEFAULT_PAGE);
      }
    },
    [],
  );

  return {
    data,
    isLoading,
    pagination,
    statusFilter,
    refetch,
    handleFilterChange,
    handleTableChange,
  };
};
