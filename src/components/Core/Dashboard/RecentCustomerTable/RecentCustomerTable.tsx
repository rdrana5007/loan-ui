"use client";
import { AppButton, AppTable } from "@/components/Common";
import { useDashboard, useResponsive } from "@/hooks";
import { CustomerRow } from "@/types";
import { formatters } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const renderFullName = (record: CustomerRow) =>
  [record.firstName, record.lastName].filter(Boolean).join(" ") || "--";

export const RecentCustomerTable = () => {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const { customers, isLoading } = useDashboard();

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
    ],
    [isMobile],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Customers
        </h2>
        {customers && customers.length > 0 && (
          <AppButton
            type="dashed"
            label="View All"
            onClick={() => router.push("/customers")}
          />
        )}
      </div>
      <AppTable
        rowKey={(record: any) => record.id}
        tableColumns={columns}
        tableData={customers}
        pagination={false}
        loading={isLoading}
        onRow={(record) => ({
          onClick: () => router.push(`/customers/${record.id}`),
          className: "cursor-pointer hover:bg-gray-50",
        })}
      />
    </div>
  );
};
