"use client";
import { useEmiSchedulingQuery } from "@/api";
import { TableProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, FILTER_KEYS } from "@/constants";
import { EmiSchedulingListParams, EmiSchedulingRow, EmiSchedulingStatusFilter, LoanEmiApiRecord } from "@/types";

const { STATUS } = FILTER_KEYS;

interface UseEmiSchedulingListingParams {
  loanId: string | number | null;
}

export const useEmiSchedulingListing = ({
  loanId,
}: UseEmiSchedulingListingParams) => {
  const [statusFilter, setStatusFilter] =
    useState<EmiSchedulingStatusFilter>("all");
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_PAGE_SIZE);

  const listParams = useMemo((): EmiSchedulingListParams => {
    const params: EmiSchedulingListParams = {
      page,
      pageSize: rowsPerPage,
    };

    if (statusFilter && statusFilter !== "all") {
      params.status = statusFilter;
    }

    return params;
  }, [page, rowsPerPage, statusFilter]);

  const id = Number(loanId);
  const { data: queryData, isLoading, refetch } = useEmiSchedulingQuery(id, listParams);

  const loanData = queryData?.loan ?? {} as LoanEmiApiRecord;
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

  const handleTableChange: TableProps<EmiSchedulingRow>["onChange"] = useCallback(
    (pagination: any) => {
      setPage(pagination.current ?? DEFAULT_PAGE);
      setRowsPerPage(pagination.pageSize ?? DEFAULT_PAGE_SIZE);
    },
    [],
  );

  const handleFilterChange = useCallback(
    (name: string, value: string | undefined) => {
      if (name === STATUS && typeof value === "string") {
        setStatusFilter(value as EmiSchedulingStatusFilter);
        setPage(DEFAULT_PAGE);
      }
    },
    [],
  );

  return {
    data,
    loanData,
    isLoading,
    pagination,
    statusFilter,
    refetch,
    handleFilterChange,
    handleTableChange,
  };
};
