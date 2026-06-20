"use client";
import {
  AppButton,
  AppTable,
  DeleteModal,
  FilterInput,
  SearchInput,
} from "@/components/Common";
import { roleList, userRole } from "@/constants";
import { usePageBreadcrumbs, useUserListing } from "@/hooks";
import { UserRow } from "@/types";
import { formatDateTime } from "@/utils";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Switch } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";

const renderValue = (value: unknown) => value || "--";
const renderDate = (value?: string) => (value ? formatDateTime(value) : "--");

const ROLE_MAP = Object.fromEntries(
  roleList.map((role) => [role.value, role.label]),
);

interface UserListingProps {
  title: string;
  breadcrumbs?: string[];
}

export const UserListing: FC<UserListingProps> = ({ title, breadcrumbs }) => {
  const router = useRouter();
  usePageBreadcrumbs(title, breadcrumbs);
  const {
    data,
    isLoading,
    isDeleting,
    pagination,
    searchValue,
    roleFilter,
    handleFilterChange,
    handleTableChange,
    handleDelete,
    handleToggle,
  } = useUserListing();

  const handleSearch = useCallback(
    (value: string) => {
      handleFilterChange?.("search", value);
    },
    [handleFilterChange],
  );

  const openDeleteModal = useCallback(
    (row: UserRow) => {
      DeleteModal({
        title: "User",
        entityName: row.fullName,
        onDelete: () => handleDelete(row.id),
      });
    },
    [handleDelete],
  );

  const renderActive = useCallback(
    (val: boolean, row: UserRow) => (
      <Switch
        checked={val}
        onChange={(checked) => handleToggle(row.id, checked)}
      />
    ),
    [handleToggle],
  );

  const renderActions = useCallback(
    (_: unknown, row: UserRow) => (
      <div className="flex items-center justify-center">
        <EditOutlined
          onClick={() => router.push(`/users/${row.id}`)}
          className="cursor-pointer text-blue-500! hover:bg-blue-50! hover:text-blue-600! p-2 rounded-full text-base sm:text-lg md:text-xl transition-all"
        />
        <DeleteOutlined
          disabled={isDeleting}
          onClick={() => openDeleteModal(row)}
          className="cursor-pointer text-red-500! hover:bg-red-50! hover:text-red-600! p-2 rounded-full text-base sm:text-lg md:text-xl transition-all"
        />
      </div>
    ),
    [openDeleteModal, isDeleting],
  );

  const columns = useMemo<ColumnsType<UserRow>>(
    () => [
      {
        title: "Name",
        dataIndex: "fullName",
        key: "fullName",
        fixed: "left",
        width: 180,
        render: renderValue,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        responsive: ["md"],
        width: 250,
        render: renderValue,
      },
      {
        title: "Mobile Number",
        dataIndex: "phone",
        key: "phone",
        width: 180,
        render: renderValue,
      },
      {
        title: "Role",
        dataIndex: "roleId",
        key: "roleId",
        width: 180,
        render: (val) => ROLE_MAP[val] ?? "--",
      },
      {
        title: "Created Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: renderDate,
      },
      {
        title: "Active",
        dataIndex: "isActive",
        key: "isActive",
        width: 180,
        render: renderActive,
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        fixed: "right",
        width: 100,
        render: renderActions,
      },
    ],
    [renderActive, renderActions],
  );

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-semibold">User Listing</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="w-full sm:flex-1 lg:w-80">
              <SearchInput
                prefixIcon={<SearchOutlined />}
                value={searchValue}
                className="w-full h-10!"
                onSearch={handleSearch}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-40">
                <FilterInput
                  placeholder="All Users"
                  filterKey="role"
                  value={roleFilter}
                  options={userRole}
                  className="w-full h-10!"
                  onChange={handleFilterChange}
                />
              </div>
              <AppButton
                icon={<PlusOutlined />}
                label="New User"
                className="w-full sm:w-auto h-10! px-4 shrink-0 whitespace-nowrap"
                onClick={() => router.push("/users/add-user")}
              />
            </div>
          </div>
        </div>
      </div>
      <AppTable
        rowKey={(record: any) => record.id}
        tableColumns={columns}
        tableData={data}
        pagination={pagination}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </>
  );
};
