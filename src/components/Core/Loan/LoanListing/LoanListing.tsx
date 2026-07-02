"use client";
import {
  AppButton,
  AppTable,
  AppTag,
  DeleteModal,
  FilterInput,
  SearchInput,
} from "@/components/Common";
import { loanStatus, loanStatusList } from "@/constants";
import { useLoanListing, usePageBreadcrumbs, useResponsive } from "@/hooks";
import { LoanRow, LoanStatus } from "@/types";
import { formatters } from "@/utils";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";

const renderFullName = (record: LoanRow) =>
  [record.customers.firstName, record.customers.lastName]
    .filter(Boolean)
    .join(" ") || "--";

const renderVerificationTag = (val?: LoanStatus) => (
  <AppTag value={val} options={loanStatusList} />
);

interface LoanListingProps {
  title: string;
  breadcrumbs?: string[];
}

export const LoanListing: FC<LoanListingProps> = ({ title, breadcrumbs }) => {
  const router = useRouter();
  const { isMobile } = useResponsive();
  usePageBreadcrumbs(title, breadcrumbs);
  const {
    data,
    isLoading,
    isDeleting,
    pagination,
    searchValue,
    statusFilter,
    fromDateFilter,
    toDateFilter,
    handleFilterChange,
    handleTableChange,
    handleDelete,
  } = useLoanListing();

  const handleSearch = useCallback(
    (value: string) => {
      handleFilterChange?.("search", value);
    },
    [handleFilterChange],
  );

  const openDeleteModal = useCallback(
    ({ id, loanNumber }: LoanRow) => {
      DeleteModal({
        title: "Loan",
        entityName: loanNumber,
        onDelete: () => handleDelete(id),
      });
    },
    [handleDelete],
  );

  const shouldShowEmiSchedule = (status: LoanStatus) => {
    return status === "active" || status === "closed" || status === "defaulted";
  };

  const renderActions = useCallback(
    (_: unknown, row: LoanRow) => (
      <div className="flex items-center justify-center">
        {shouldShowEmiSchedule(row?.status) && (
          <EyeOutlined
            onClick={() => router.push(`/loans/${row.id}/emi-schedules`)}
            className="cursor-pointer text-green-500! hover:bg-green-50! hover:text-green-600! p-2 rounded-full text-lg md:text-xl transition-all"
          />
        )}
        <EditOutlined
          onClick={() => router.push(`/loans/${row.id}`)}
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

  const columns = useMemo<ColumnsType<LoanRow>>(
    () => [
      {
        title: "Loan Number",
        dataIndex: "loanNumber",
        key: "loanNumber",
        fixed: !isMobile ? "left" : undefined,
        width: 180,
        render: formatters.value,
      },
      {
        title: "Loan Amount",
        dataIndex: "loanAmount",
        key: "loanAmount",
        responsive: ["md"],
        width: 180,
        render: formatters.value,
      },
      {
        title: "Interest Rate",
        dataIndex: "interestRate",
        key: "interestRate",
        responsive: ["md"],
        width: 180,
        render: formatters.value,
      },
      {
        title: "Tenure Months",
        dataIndex: "tenureMonths",
        key: "tenureMonths",
        responsive: ["md"],
        width: 180,
        render: formatters.value,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 180,
        render: renderVerificationTag,
      },
      {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
        width: 180,
        render: formatters.date,
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
        width: 180,
        render: formatters.date,
      },
      {
        title: "Customer",
        key: "customer",
        width: 180,
        render: (_, record) => renderFullName(record),
      },
      {
        title: "Collector",
        dataIndex: ["collectors", "fullName"],
        key: "collector",
        width: 180,
        render: formatters.value,
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
        render: formatters.dateTime,
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
    [isMobile, renderActions],
  );

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-semibold">Loan Listing</h2>
          <div className="flex flex-col xl:flex-row gap-3 w-full xl:w-auto">
            <div className="w-full xl:w-80">
              <SearchInput
                prefixIcon={<SearchOutlined />}
                value={searchValue}
                className="w-full h-10!"
                onSearch={handleSearch}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full xl:w-auto">
              <FilterInput
                isDatePicker
                placeholder="Select Start Date"
                filterKey="fromDate"
                value={fromDateFilter}
                className="w-full h-10!"
                onChange={handleFilterChange}
              />
              <FilterInput
                isDatePicker
                placeholder="Select End Date"
                filterKey="toDate"
                value={toDateFilter}
                className="w-full h-10!"
                onChange={handleFilterChange}
              />
              <FilterInput
                placeholder="All Status"
                filterKey="status"
                value={statusFilter}
                options={loanStatus}
                className="w-full h-10!"
                onChange={handleFilterChange}
              />
            </div>
            <div className="w-full sm:w-auto xl:ml-auto text-right">
              <AppButton
                icon={<PlusOutlined />}
                label="New Loan"
                className="w-full sm:w-auto h-10! px-4 whitespace-nowrap"
                onClick={() => router.push("/loans/add-loan")}
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
