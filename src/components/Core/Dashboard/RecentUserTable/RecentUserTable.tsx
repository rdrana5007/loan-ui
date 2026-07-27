"use client";
import { AppButton, AppTable } from "@/components/Common";
import { roleList } from "@/constants";
import { useDashboard, useResponsive } from "@/hooks";
import { UserRow } from "@/types";
import { createOptionMap, formatters } from "@/utils";
import { EditOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

const ROLE_MAP = createOptionMap(roleList);

export const RecentUserTable = () => {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const { users, isLoading } = useDashboard();

  const renderActions = useCallback(
    (_: unknown, row: UserRow) => (
      <div className="flex items-center justify-center">
        <EditOutlined
          onClick={() => router.push(`/users/${row.id}`)}
          className="cursor-pointer text-blue-500! hover:bg-blue-50! hover:text-blue-600! p-2 rounded-full text-lg md:text-xl transition-all"
        />
      </div>
    ),
    [router],
  );

  const columns = useMemo<ColumnsType<UserRow>>(
    () => [
      {
        title: "Name",
        dataIndex: "fullName",
        key: "fullName",
        fixed: !isMobile ? "left" : undefined,
        width: 180,
        render: formatters.value,
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
        width: 180,
        render: formatters.value,
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
        <h2 className="text-lg font-semibold text-gray-800">Recent Users</h2>
        {users && users.length > 0 && (
          <AppButton
            type="dashed"
            label="View All"
            onClick={() => router.push("/users")}
          />
        )}
      </div>
      <AppTable
        rowKey={(record: any) => record.id}
        tableColumns={columns}
        tableData={users}
        pagination={false}
        loading={isLoading}
      />
    </div>
  );
};
