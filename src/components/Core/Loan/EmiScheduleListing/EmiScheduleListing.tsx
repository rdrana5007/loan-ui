"use client";
import { AppTable, AppTag, FilterInput } from "@/components/Common";
import { emiScheduleStatus, emiScheduleStatusList } from "@/constants";
import {
  useEmiScheduleListing,
  usePageBreadcrumbs,
  useResponsive,
} from "@/hooks";
import { EmiScheduleRow, EmiScheduleStatus } from "@/types";
import { formatters, resolveNumericId } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useParams } from "next/navigation";
import { FC, useMemo } from "react";

const renderVerificationTag = (val?: EmiScheduleStatus) => (
  <AppTag value={val} options={emiScheduleStatusList} />
);

interface EmiScheduleListingProps {
  breadcrumbs?: string[];
}

export const EmiScheduleListing: FC<EmiScheduleListingProps> = ({
  breadcrumbs,
}) => {
  const params = useParams<{ id: string }>();
  const { isMobile } = useResponsive();

  const id: string = params?.id;
  const loanId = useMemo(() => resolveNumericId(id), [id]);

  const {
    loanNumber,
    data,
    isLoading,
    pagination,
    statusFilter,
    handleFilterChange,
    handleTableChange,
  } = useEmiScheduleListing({ loanId });

  const title: string = loanNumber || "Emi Schedules";
  usePageBreadcrumbs(title, breadcrumbs, "Loans");

  const columns = useMemo<ColumnsType<EmiScheduleRow>>(
    () => [
      {
        title: "Installment No.",
        dataIndex: "installmentNo",
        key: "installmentNo",
        fixed: !isMobile ? "left" : undefined,
        width: 180,
        render: formatters.value,
      },
      {
        title: "EMI Amount",
        dataIndex: "emiScheduleAmount",
        key: "emiScheduleAmount",
        width: 180,
        render: formatters.value,
      },
      {
        title: "Principal Amount",
        dataIndex: "principalAmount",
        key: "principalAmount",
        width: 180,
        render: formatters.value,
      },
      {
        title: "Interest Amount",
        dataIndex: "interestAmount",
        key: "interestAmount",
        width: 180,
        render: formatters.value,
      },
      {
        title: "Paid Amount",
        dataIndex: "paidAmount",
        key: "paidAmount",
        width: 180,
        render: formatters.value,
      },
      {
        title: "Balance Amount",
        dataIndex: "balanceAmount",
        key: "balanceAmount",
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
        title: "Due Date",
        dataIndex: "dueDate",
        key: "dueDate",
        width: 180,
        render: formatters.date,
      },
      {
        title: "Paid Date",
        dataIndex: "paidDate",
        key: "paidDate",
        width: 180,
        render: formatters.date,
      },
    ],
    [isMobile],
  );

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-semibold">
            EMI Schedule Listing
          </h2>
          <div className="w-full sm:w-64">
            <FilterInput
              placeholder="All Status"
              filterKey="status"
              value={statusFilter}
              options={emiScheduleStatus}
              className="w-full h-10!"
              onChange={handleFilterChange}
            />
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
