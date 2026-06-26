"use client";
import {
  AppButton,
  AppSwitch,
  AppTable,
  AppTag,
  DeleteModal,
  FilterInput,
  SearchInput,
} from "@/components/Common";
import {
  customerVerificationStatus,
  customerVerificationStatusList,
  userStatus,
} from "@/constants";
import { useCustomerListing, usePageBreadcrumbs, useResponsive } from "@/hooks";
import { CustomerRow, VerificationStatus } from "@/types";
import { createOptionMap, formatters } from "@/utils";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";

const renderFullName = (record: CustomerRow) =>
  [record.firstName, record.lastName].filter(Boolean).join(" ") || "--";

const VERIFICATION_COLOR_MAP: Record<VerificationStatus, string> = {
  pending: "gold",
  verified: "green",
  rejected: "red",
};

const VERIFICATION_MAP = createOptionMap(customerVerificationStatusList);

const renderVerificationTag = (val?: VerificationStatus) => (
  <AppTag
    value={val}
    labelMap={VERIFICATION_MAP}
    colorMap={VERIFICATION_COLOR_MAP}
  />
);

interface CustomerListingProps {
  title: string;
  breadcrumbs?: string[];
}

export const CustomerListing: FC<CustomerListingProps> = ({
  title,
  breadcrumbs,
}) => {
  const router = useRouter();
  const { isMobile } = useResponsive();
  usePageBreadcrumbs(title, breadcrumbs);
  const {
    data,
    isLoading,
    isDeleting,
    pagination,
    searchValue,
    verificationFilter,
    statusFilter,
    handleFilterChange,
    handleTableChange,
    handleDelete,
    handleToggle,
  } = useCustomerListing();

  const handleSearch = useCallback(
    (value: string) => {
      handleFilterChange?.("search", value);
    },
    [handleFilterChange],
  );

  const openDeleteModal = useCallback(
    ({ id, firstName }: CustomerRow) => {
      DeleteModal({
        title: "Customer",
        entityName: firstName,
        onDelete: () => handleDelete(id),
      });
    },
    [handleDelete],
  );

  const renderActive = useCallback(
    (val: boolean, row: CustomerRow) => (
      <AppSwitch
        checked={val}
        onChange={(checked) => handleToggle(row.id, checked)}
      />
    ),
    [handleToggle],
  );

  const renderActions = useCallback(
    (_: unknown, row: CustomerRow) => (
      <div className="flex items-center justify-center">
        <EditOutlined
          onClick={() => router.push(`/customers/${row.id}`)}
          className="cursor-pointer text-blue-500! hover:bg-blue-50! hover:text-blue-600! p-2 rounded-full text-lg md:text-xl transition-all"
        />
        <DeleteOutlined
          disabled={isDeleting}
          onClick={() => openDeleteModal(row)}
          className="cursor-pointer text-red-500! hover:bg-red-50! hover:text-red-600! p-2 rounded-full text-lg md:text-xl transition-all"
        />
      </div>
    ),
    [router, isDeleting, openDeleteModal],
  );

  const columns = useMemo<ColumnsType<CustomerRow>>(
    () => [
      {
        title: "Code",
        dataIndex: "customerCode",
        key: "customerCode",
        fixed: !isMobile ? "left" : undefined,
        width: 180,
        render: formatters.value,
      },
      {
        title: "Name",
        key: "fullName",
        width: 180,
        render: (_, record) => renderFullName(record),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        responsive: ["md"],
        width: 250,
        render: formatters.value,
      },
      {
        title: "Mobile Number",
        dataIndex: "phone",
        key: "phone",
        responsive: ["md"],
        width: 180,
        render: formatters.value,
      },
      {
        title: "Verification",
        dataIndex: ["customer_documents", "verificationStatus"],
        key: "verificationStatus",
        width: 180,
        render: renderVerificationTag,
      },
      {
        title: "Created By",
        dataIndex: ["created_by", "fullName"],
        key: "fullName",
        width: 180,
        render: formatters.value,
      },
      {
        title: "Created Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: formatters.date,
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
        width: !isMobile ? 100 : 60,
        render: renderActions,
      },
    ],
    [isMobile, renderActive, renderActions],
  );

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-semibold">Customer Listing</h2>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full xl:w-auto">
            <div className="w-full sm:flex-1 lg:w-80">
              <SearchInput
                prefixIcon={<SearchOutlined />}
                value={searchValue}
                className="w-full h-10!"
                onSearch={handleSearch}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-40 md:w-30 lg:w-40">
                  <FilterInput
                    placeholder="Verification Status"
                    filterKey="verification"
                    value={verificationFilter}
                    options={customerVerificationStatus}
                    className="w-full h-10!"
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="w-full sm:w-40 md:w-30 lg:w-40">
                  <FilterInput
                    placeholder="All Status"
                    filterKey="status"
                    value={statusFilter}
                    options={userStatus}
                    className="w-full h-10!"
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <div className="w-full sm:w-auto sm:ml-auto">
                <AppButton
                  icon={<PlusOutlined />}
                  label="New Customer"
                  className="w-full sm:w-auto h-10! px-4 shrink-0 whitespace-nowrap"
                  onClick={() => router.push("/customers/add-customer")}
                />
              </div>
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
