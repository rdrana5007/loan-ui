"use client";
import { useDeleteUserMutation, useUpdateUserMutation, useUsersQuery } from "@/api";
import { RoleFilter, StatusFilter, UserListParams, UserRow } from "@/types";
import { TableProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";
import { AppToast } from "@/components";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants";

export const useUserListing = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_PAGE_SIZE);

  const trimmedSearch = debouncedSearch.trim();

  const listParams = useMemo((): UserListParams => {
    const params: UserListParams = {
      page,
      pageSize: rowsPerPage
    };

    if (trimmedSearch.length >= 2) {
      params.search = trimmedSearch;
    }
    if (roleFilter === "isManager") params.isManager = true;
    if (roleFilter === "isCollector") params.isCollector = true;
    if (statusFilter === "active") params.status = true;
    if (statusFilter === "inactive") params.status = false;

    return params;
  }, [trimmedSearch, page, rowsPerPage, roleFilter, statusFilter]);

  const { data: queryData, isLoading } = useUsersQuery(listParams);
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUserMutation();
  const { mutateAsync: updateUser } = useUpdateUserMutation();

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

  const handleTableChange: TableProps<UserRow>["onChange"] = useCallback((pagination: any) => {
    setPage(pagination.current ?? DEFAULT_PAGE);
    setRowsPerPage(pagination.pageSize ?? DEFAULT_PAGE_SIZE);
  }, []);

  const handleFilterChange = useCallback(
    (name: string, value: string | undefined) => {
      if (name === "search" && typeof value === "string") {
        setSearch(value);
        setPage(DEFAULT_PAGE);
      }
      if (name === "role" && typeof value === "string") {
        setRoleFilter(value as RoleFilter);
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
      await deleteUser(id);
    },
    [deleteUser]
  );

  const handleToggle = useCallback(
    async (id: number, isActive: boolean) => {
      try {
        await updateUser({
          id,
          payload: { isActive },
        });
        AppToast.success(isActive ? "User activated" : "User deactivated");
      } catch {
        AppToast.error("Failed to update user status");
      }
    },
    [updateUser]
  );

  return {
    data,
    isLoading,
    isDeleting,
    pagination,
    searchValue: search,
    roleFilter,
    statusFilter,
    handleFilterChange,
    handleTableChange,
    handleDelete,
    handleToggle
  };
};
