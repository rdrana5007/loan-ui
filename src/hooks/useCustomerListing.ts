"use client";
import { useCustomersQuery, useDeleteCustomerMutation, useUpdateCustomerMutation } from "@/api";
import { CustomerListParams, CustomerRow } from "@/types";
import { TableProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";
import { AppToast } from "@/components";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants";

export const useCustomerListing = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [verificationFilter, setVerificationFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const trimmedSearch = debouncedSearch.trim();

  const listParams = useMemo((): CustomerListParams => {
    const params: CustomerListParams = {};
    if (trimmedSearch.length >= 2) {
      params.search = trimmedSearch;
    }
    if (verificationFilter === "pending" || verificationFilter === "verified" || verificationFilter === "rejected") {
      params.verificationStatus = verificationFilter;
    }
    if (statusFilter === "active") {
      params.status = true;
    }
    if (statusFilter === "inactive") {
      params.status = false;
    }
    params.page = page;
    params.pageSize = rowsPerPage;
    return params;
  }, [trimmedSearch, page, rowsPerPage, verificationFilter, statusFilter]);

  const { data: queryData, isLoading } = useCustomersQuery(listParams);
  const { mutateAsync: deleteCustomer, isPending: isDeleting } = useDeleteCustomerMutation();
  const { mutateAsync: updateCustomer } = useUpdateCustomerMutation();

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

  const handleTableChange: TableProps<CustomerRow>["onChange"] = useCallback((pagination: any) => {
    setPage(pagination.current ?? DEFAULT_PAGE);
    setRowsPerPage(pagination.pageSize ?? DEFAULT_PAGE_SIZE);
  }, []);

  const handleFilterChange = useCallback(
    (name: string, value: string | undefined) => {
      if (name === "search" && typeof value === "string") {
        setSearch(value);
        setPage(DEFAULT_PAGE);
      }
      if (name === "verification" && typeof value === "string") {
        setVerificationFilter(value);
        setPage(DEFAULT_PAGE);
      }
      if (name === "status" && typeof value === "string") {
        setStatusFilter(value);
        setPage(DEFAULT_PAGE);
      }
    },
    [],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      await deleteCustomer(id);
    },
    [deleteCustomer]
  );

  const handleToggle = useCallback(
    async (id: number, isActive: boolean) => {
      try {
        await updateCustomer({
          id,
          payload: { isActive },
        });
        AppToast.success(isActive ? "Customer activated" : "Customer deactivated");
      } catch {
        AppToast.error("Failed to update customer status");
      }
    },
    [updateCustomer]
  );

  return {
    data,
    isLoading,
    isDeleting,
    pagination,
    searchValue: search,
    verificationFilter,
    statusFilter,
    handleFilterChange,
    handleTableChange,
    handleDelete,
    handleToggle
  };
};