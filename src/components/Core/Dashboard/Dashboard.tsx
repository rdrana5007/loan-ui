"use client";
import { useDashboard } from "@/hooks";
import { RecentLoanTable } from "./RecentLoanTable";
import { RecentCustomerTable } from "./RecentCustomerTable";
import { RecentUserTable } from "./RecentUserTable";

export const Dashboard = () => {
  const { } = useDashboard();

  return (
    <div className="flex flex-col gap-6">
      <RecentLoanTable />
      <RecentCustomerTable />
      <RecentUserTable />
    </div>
  );
};
