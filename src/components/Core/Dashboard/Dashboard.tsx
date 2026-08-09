"use client";
import { FC } from "react";
import { useDashboard, usePageBreadcrumbs } from "@/hooks";
import { RecentLoanTable } from "./RecentLoanTable";
import { RecentCustomerTable } from "./RecentCustomerTable";
import { RecentUserTable } from "./RecentUserTable";
import { DashboardCard } from "./DashboardCard";
import { StatusChart } from "./StatusChart";
import { Col, Row } from "antd";
import {
  EMI_FOLLOW_UP_CHART,
  LOAN_STATUS_CHART,
  timePeriod,
} from "@/constants";
import { FilterInput } from "@/components/Common";
import { IncomeExpenseChart } from "./IncomeExpenseChart";

interface DashboardProps {
  title: string;
  breadcrumbs?: string[];
}

export const Dashboard: FC<DashboardProps> = ({ title, breadcrumbs }) => {
  usePageBreadcrumbs(title, breadcrumbs);
  const {
    timePeriodFilter,
    dashboardSummaryCards,
    loanStatusChartData,
    emiFollowUpStatusChartData,
    expenseIncomeChartData,
    isDashboardSummaryLoading,
    isStatusSummaryLoading,
    isExpenseIncomeSummaryLoading,
    handleFilterChange,
  } = useDashboard();

  return (
    <>
      <div className="space-y-6">
        <div className="flex w-full justify-end">
          <FilterInput
            placeholder="Time Period"
            filterKey="timePeriod"
            value={timePeriodFilter}
            options={timePeriod}
            className="w-full sm:w-64 h-10!"
            onChange={handleFilterChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"> */}
          {dashboardSummaryCards?.map((item, index) => (
            <DashboardCard
              key={index}
              data={item}
              isLoading={isDashboardSummaryLoading}
            />
          ))}
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <StatusChart
              title="Loan Status"
              data={loanStatusChartData}
              isLoading={isStatusSummaryLoading}
              colorDomain={LOAN_STATUS_CHART.domain}
              colorRange={LOAN_STATUS_CHART.range}
            />
          </Col>
          <Col xs={24} md={12}>
            <StatusChart
              title="EMI Follow-up Status"
              data={emiFollowUpStatusChartData}
              isLoading={isStatusSummaryLoading}
              colorDomain={EMI_FOLLOW_UP_CHART.domain}
              colorRange={EMI_FOLLOW_UP_CHART.range}
            />
          </Col>
          {/* <Col xs={24} md={12}>
            <IncomeExpenseChart
              title="Income vs Expense (Last 6 Months)"
              data={expenseIncomeChartData}
              isLoading={isExpenseIncomeSummaryLoading}
            />
          </Col> */}
        </Row>
        <div className="flex flex-col gap-6">
          <RecentLoanTable />
          <RecentCustomerTable />
          <RecentUserTable />
        </div>
      </div>
    </>
  );
};
