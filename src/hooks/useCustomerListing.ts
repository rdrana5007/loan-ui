"use client";
import { useCustomersQuery, useDeleteCustomerMutation, useUpdateCustomerMutation } from "@/api";
import { CustomerListParams, CustomerRow, StatusFilter, VerificationFilter } from "@/types";
import { TableProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";
import { AppToast } from "@/components";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants";

export const useCustomerListing = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [verificationFilter, setVerificationFilter] = useState<VerificationFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_PAGE_SIZE);

  const trimmedSearch = debouncedSearch.trim();

  const listParams = useMemo((): CustomerListParams => {
    const params: CustomerListParams = {
      page,
      pageSize: rowsPerPage
    };

    if (trimmedSearch.length >= 2) {
      params.search = trimmedSearch;
    }
    if (verificationFilter !== "all") {
      params.verificationStatus = verificationFilter;
    }
    if (statusFilter === "active") params.status = true;
    if (statusFilter === "inactive") params.status = false;

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
        setVerificationFilter(value as VerificationFilter);
        setPage(DEFAULT_PAGE);
      }
      if (name === "status" && typeof value === "string") {
        setStatusFilter(value as StatusFilter);
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
        const formData = new FormData();
        formData.append("isActive", String(isActive));

        await updateCustomer({
          id,
          payload: formData,
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