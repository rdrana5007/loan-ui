"use client";
import { AppButton, AppTable } from "@/components/Common";
import { useDashboard, useResponsive } from "@/hooks";
import { LoanRow } from "@/types";
import { formatters } from "@/utils";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

const renderFullName = (record: LoanRow) =>
  [record.customers.firstName, record.customers.lastName]
    .filter(Boolean)
    .join(" ") || "--";

export const RecentLoanTable = () => {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const { loans, isLoading } = useDashboard();

  const renderActions = useCallback(
    (_: unknown, row: LoanRow) => (
      <div className="flex items-center justify-end">
        <EyeOutlined
          onClick={() => router.push(`/loans/${row.id}/loan-detail`)}
          className="cursor-pointer text-green-500! hover:bg-green-50! hover:text-green-600! p-2 rounded-full text-lg md:text-xl transition-all"
        />
        <EditOutlined
          onClick={() => router.push(`/loans/${row.id}`)}
          className="cursor-pointer text-blue-500! hover:bg-blue-50! hover:text-blue-600! p-2 rounded-full text-lg md:text-xl transition-all"
        />
      </div>
    ),
    [router],
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
        render: formatters.currency,
      },
      {
        title: "Interest Rate (%)",
        dataIndex: "interestRate",
        key: "interestRate",
        responsive: ["md"],
        width: 180,
        render: formatters.value,
      },
      {
        title: "Installment Count",
        dataIndex: "installmentCount",
        key: "installmentCount",
        width: 180,
        render: formatters.value,
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
        width: 50,
        render: renderActions,
      },
    ],
    [isMobile, renderActions],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Recent Loans</h2>
        {loans && loans.length > 0 && (
          <AppButton
            type="dashed"
            label="View All"
            onClick={() => router.push("/loans")}
          />
        )}
      </div>
      <AppTable
        rowKey={(record: any) => record.id}
        tableColumns={columns}
        tableData={loans}
        pagination={false}
        loading={isLoading}
      />
    </div>
  );
};
