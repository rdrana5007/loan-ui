"use client";
import { useEmiSchedulesQuery } from "@/api";
import {
  EmiScheduleListParams,
  EmiScheduleRow,
  EmiScheduleStatusFilter,
} from "@/types";
import { TableProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, FILTER_KEYS } from "@/constants";

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
    };

    if (statusFilter && statusFilter !== "all") {
      params.status = statusFilter;
    }

    return params;
  }, [page, rowsPerPage, statusFilter]);

  const id = Number(loanId);
  const { data: queryData, isLoading } = useEmiSchedulesQuery(id, listParams);

  const loanNumber = queryData?.loanNumber ?? "";
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
      setPage(pagination.current ?? DEFAULT_PAGE);
      setRowsPerPage(pagination.pageSize ?? DEFAULT_PAGE_SIZE);
    },
    [],
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
    loanNumber,
    data,
    isLoading,
    pagination,
    statusFilter,
    handleFilterChange,
    handleTableChange,
  };
};
