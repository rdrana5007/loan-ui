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

  const renderActions = useCallback(
    (_: unknown, row: LoanRow) => (
      <div className="flex items-center justify-center">
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
                  {/* <FilterInput
                    placeholder="All Users"
                    filterKey="role"
                    value={roleFilter}
                    options={userRole}
                    className="w-full h-10!"
                    onChange={handleFilterChange}
                  /> */}
                </div>
                <div className="w-full sm:w-40 md:w-30 lg:w-40">
                  <FilterInput
                    placeholder="All Status"
                    filterKey="status"
                    value={statusFilter}
                    options={loanStatus}
                    className="w-full h-10!"
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <div className="w-full sm:w-auto sm:ml-auto">
                <AppButton
                  icon={<PlusOutlined />}
                  label="New Loan"
                  className="w-full sm:w-auto h-10! px-4 shrink-0 whitespace-nowrap"
                  onClick={() => router.push("/loans/add-loan")}
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
