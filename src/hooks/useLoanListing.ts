"use client";
import { useDeleteLoanMutation, useLoansQuery } from "@/api";
import { LoanListParams, LoanRow, LoanStatusFilter } from "@/types";
import { TableProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, FILTER_KEYS, SEARCH_DEBOUNCE_MS } from "@/constants";
import dayjs, { Dayjs } from "dayjs";

const { SEARCH, STATUS, FROM_DATE, TO_DATE } = FILTER_KEYS;

export const useLoanListing = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS);
  const [statusFilter, setStatusFilter] = useState<LoanStatusFilter>("all");
  const [fromDateFilter, setFromDateFilter] = useState<Dayjs | null>(null);
  const [toDateFilter, setToDateFilter] = useState<Dayjs | null>(null);
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_PAGE_SIZE);

  const trimmedSearch = debouncedSearch.trim();

  const listParams = useMemo((): LoanListParams => {
    const params: LoanListParams = {
      page,
      pageSize: rowsPerPage
    };

    if (trimmedSearch.length >= 2) {
      params.search = trimmedSearch;
    }
    if (statusFilter && statusFilter !== "all") {
      params.status = statusFilter;
    }
    if (fromDateFilter) params.fromDate = fromDateFilter?.format("YYYY-MM-DD");
    if (toDateFilter) params.toDate = toDateFilter?.format("YYYY-MM-DD");

    return params;
  }, [trimmedSearch, page, rowsPerPage, statusFilter, fromDateFilter, toDateFilter]);

  const { data: queryData, isLoading } = useLoansQuery(listParams);
  const { mutateAsync: deleteLoan, isPending: isDeleting } = useDeleteLoanMutation();

  const data = queryData?.items ?? [];
  const pageInfo = queryData?.page_info;

  const pagination = useMemo(
    () => ({
      current: pageInfo?.current_page ?? page,
      pageSize: pageInfo?.page_size ?? rowsPerPage,
      total: pageInfo?.total_count ?? data.length
    }),
    [pageInfo, page, rowsPerPage, data],
  );

  const handleTableChange: TableProps<LoanRow>["onChange"] = useCallback((pagination: any) => {
    setPage(pagination.current ?? DEFAULT_PAGE);
    setRowsPerPage(pagination.pageSize ?? DEFAULT_PAGE_SIZE);
  }, []);

  const handleFilterChange = useCallback(
    (name: string, value: string | undefined) => {
      if (name === SEARCH && typeof value === "string") {
        setSearch(value);
        setPage(DEFAULT_PAGE);
      }
      if (name === STATUS && typeof value === "string") {
        setStatusFilter(value as LoanStatusFilter);
        setPage(DEFAULT_PAGE);
      }
      if (name === FROM_DATE) {
        setFromDateFilter(value ? dayjs(value) : null);
        setPage(DEFAULT_PAGE);
      }
      if (name === TO_DATE) {
        setToDateFilter(value ? dayjs(value) : null);
        setPage(DEFAULT_PAGE);
      }
    },
    [],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      await deleteLoan(id);
    },
    [deleteLoan]
  );

  return {
    data,
    isLoading,
    isDeleting,
    pagination,
    searchValue: search,
    statusFilter,
    fromDateFilter,
    toDateFilter,
    handleFilterChange,
    handleTableChange,
    handleDelete
  };
};