"use client";
import { TableProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, FILTER_KEYS } from "@/constants";
import {
  EmiScheduleListParams,
  EmiScheduleRow,
  EmiScheduleStatusFilter,
  LoanEmiApiRecord,
} from "@/types";
import { useEmiSchedulesByLoanQuery } from "@/api";

const { STATUS } = FILTER_KEYS;

interface UseEmiScheduleListingParams {
  loanId: string | number | null;
}

export const useEmiScheduleListing = ({
  loanId,
}: UseEmiScheduleListingParams) => {
  const [statusFilter, setStatusFilter] =
    useState<EmiScheduleStatusFilter>("all");
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_PAGE_SIZE);

  const listParams = useMemo((): EmiScheduleListParams => {
    const params: EmiScheduleListParams = {
      page,
      pageSize: rowsPerPage,
      sortField: "installmentNo",
      sortOrder: "asc",
    };

    if (statusFilter && statusFilter !== "all") {
      params.status = statusFilter;
    }

    return params;
  }, [page, rowsPerPage, statusFilter]);

  const id = Number(loanId);
  const {
    data: queryData,
    isLoading,
    refetch,
  } = useEmiSchedulesByLoanQuery(id, listParams);

  const loanData = queryData?.loan ?? ({} as LoanEmiApiRecord);
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

  const handleTableChange: TableProps<EmiScheduleRow>["onChange"] = useCallback(
    (pagination: any) => {
      const newPage = pagination.current ?? DEFAULT_PAGE;
      const newPageSize = pagination.pageSize ?? DEFAULT_PAGE_SIZE;

      if (newPageSize !== rowsPerPage) {
        setPage(DEFAULT_PAGE);
        setRowsPerPage(newPageSize);
      } else {
        setPage(newPage);
      }
    },
    [rowsPerPage],
  );

  const handleFilterChange = useCallback(
    (name: string, value: string | undefined) => {
      if (name === STATUS && typeof value === "string") {
        setStatusFilter(value as EmiScheduleStatusFilter);
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
