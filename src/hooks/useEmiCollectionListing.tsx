"use client";
import {
  EmiCollectionListParams,
  EmiCollectionRow,
  PaymentMethodFilter,
} from "@/types";
import { TableProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants";
import { useEmiCollectionsQuery } from "@/api/emiCollection";

export const useEmiCollectionListing = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [paymentmethodFilter, setPaymentMethodFilter] =
    useState<PaymentMethodFilter>("all");
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_PAGE_SIZE);

  const trimmedSearch = debouncedSearch.trim();

  const listParams = useMemo((): EmiCollectionListParams => {
    const params: EmiCollectionListParams = {
      page,
      pageSize: rowsPerPage,
    };

    if (trimmedSearch.length >= 2) {
      params.search = trimmedSearch;
    }

    if (paymentmethodFilter && paymentmethodFilter !== "all") {
      params.paymentMethod = paymentmethodFilter;
    }

    return params;
  }, [trimmedSearch, page, rowsPerPage, paymentmethodFilter]);

  const { data: queryData, isLoading } = useEmiCollectionsQuery(listParams);

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

  const handleTableChange: TableProps<EmiCollectionRow>["onChange"] =
    useCallback((pagination: any) => {
      setPage(pagination.current ?? DEFAULT_PAGE);
      setRowsPerPage(pagination.pageSize ?? DEFAULT_PAGE_SIZE);
    }, []);

  const handleFilterChange = useCallback(
    (name: string, value: string | undefined) => {
      if (name === "search" && typeof value === "string") {
        setSearch(value);
        setPage(DEFAULT_PAGE);
      }
      if (name === "paymentMethod" && typeof value === "string") {
        setPaymentMethodFilter(value as PaymentMethodFilter);
        setPage(DEFAULT_PAGE);
      }
    },
    [],
  );

  return {
    data,
    isLoading,
    pagination,
    searchValue: search,
    paymentmethodFilter,
    handleFilterChange,
    handleTableChange,
  };
};
