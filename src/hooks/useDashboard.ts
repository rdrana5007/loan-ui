"use client";
import {
  useCustomersQuery,
  useDashboardExpenseIncomeSummaryQuery,
  useDashboardStatusSummaryQuery,
  useDashboardSummaryQuery,
  useLoansQuery,
  useUsersQuery,
} from "@/api";
import {
  CUSTOMER_VERIFICATION_STATUS,
  DASHBOARD_PAGE_SIZE,
  DEFAULT_PAGE,
  FILTER_KEYS,
  LOAN_STATUS,
} from "@/constants";
import {
  CustomerListParams,
  DashboardCardItem,
  DashboardExpenseIncomeSummary,
  DashboardStatusSummary,
  DashboardSummary,
  DefaultTimePeriodFilter,
  IncomeExpenseChartItem,
  LoanListParams,
  StatusChartItem,
  TimePeriodFilter,
  UserListParams,
} from "@/types";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  MoneyCollectOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useCallback, useMemo, useState } from "react";

const userListParams: UserListParams = {
  page: DEFAULT_PAGE,
  pageSize: DASHBOARD_PAGE_SIZE,
  status: true,
};

const customerListParams: CustomerListParams = {
  page: DEFAULT_PAGE,
  pageSize: DASHBOARD_PAGE_SIZE,
  verificationStatus: CUSTOMER_VERIFICATION_STATUS.VERIFIED,
  status: true,
};

const loanListParams: LoanListParams = {
  page: DEFAULT_PAGE,
  pageSize: DASHBOARD_PAGE_SIZE,
  status: LOAN_STATUS.ACTIVE,
};

const formatChartData = (
  items?: { status: string; count: number }[],
): StatusChartItem[] =>
  items?.reduce<StatusChartItem[]>((acc, { status, count }) => {
    if (count > 0) {
      acc.push({
        type: status?.[0]?.toUpperCase() + status.slice(1),
        value: count,
      });
    }
    return acc;
  }, []) ?? [];

export const useDashboard = () => {
  const [timePeriodFilter, setTimePeriodFilter] = useState<TimePeriodFilter>(
    DefaultTimePeriodFilter,
  );

  const { data: dashboardSummaryData, isLoading: isDashboardSummaryLoading } =
    useDashboardSummaryQuery({ period: timePeriodFilter });
  const { data: statusSummaryData, isLoading: isStatusSummaryLoading } =
    useDashboardStatusSummaryQuery({ period: timePeriodFilter });
  const {
    data: expenseIncomeSummaryData,
    isLoading: isExpenseIncomeSummaryLoading,
  } = useDashboardExpenseIncomeSummaryQuery();
  const { data: userData, isLoading: isUserLoading } =
    useUsersQuery(userListParams);
  const { data: customerData, isLoading: isCustomerLoading } =
    useCustomersQuery(customerListParams);
  const { data: loanData, isLoading: isLoanLoading } =
    useLoansQuery(loanListParams);

  const summary = dashboardSummaryData as DashboardSummary | undefined;
  const status = statusSummaryData as DashboardStatusSummary | undefined;
  const expenseIncome =
    (expenseIncomeSummaryData as DashboardExpenseIncomeSummary[] | undefined) ??
    [];
  const users = userData?.items ?? [];
  const customers = customerData?.items ?? [];
  const loans = loanData?.items ?? [];

  const isLoading: boolean =
    isUserLoading || isCustomerLoading || isLoanLoading;

  const dashboardSummaryCards = useMemo<DashboardCardItem[]>(
    () => [
      {
        title: "Managers",
        count: summary?.users?.managers?.inPeriod ?? 0,
        icon: TeamOutlined,
      },
      {
        title: "Collectors",
        count: summary?.users?.collectors?.inPeriod ?? 0,
        icon: UsergroupAddOutlined,
      },
      {
        title: "Customers",
        count: summary?.customers?.inPeriod ?? 0,
        icon: UserOutlined,
      },
      {
        title: "Loans",
        count: summary?.loans?.inPeriod ?? 0,
        icon: WalletOutlined,
      },
      {
        title: "Pending Loans",
        count: summary?.loans?.pending ?? 0,
        icon: ClockCircleOutlined,
      },
      {
        title: "Active Loans",
        count: summary?.loans?.active ?? 0,
        icon: CheckCircleOutlined,
      },
      {
        title: "Closed Loans",
        count: summary?.loans?.closed ?? 0,
        icon: FileDoneOutlined,
      },
      {
        title: "EMI Collected",
        count: summary?.emiCollected ?? 0,
        icon: MoneyCollectOutlined,
        prefix: "₹",
      },
    ],
    [summary],
  );

  const loanStatusChartData = useMemo(
    () => formatChartData(status?.loan),
    [status?.loan],
  );

  const emiFollowUpStatusChartData = useMemo(
    () => formatChartData(status?.emiFollowup),
    [status?.emiFollowup],
  );

  const expenseIncomeChartData = useMemo<IncomeExpenseChartItem[]>(
    () =>
      expenseIncome?.flatMap((item) => [
        {
          month: item.month,
          type: "Income",
          value: item.income,
        },
        {
          month: item.month,
          type: "Expense",
          value: item.expense,
        },
      ]),
    [expenseIncome],
  );

  const handleFilterChange = useCallback(
    (name: string, value: string | undefined) => {
      if (name === FILTER_KEYS.TIME_FILTER && typeof value === "string") {
        setTimePeriodFilter(value as TimePeriodFilter);
      }
    },
    [],
  );

  return {
    timePeriodFilter,
    dashboardSummaryCards,
    loanStatusChartData,
    emiFollowUpStatusChartData,
    expenseIncomeChartData,
    users,
    customers,
    loans,
    isDashboardSummaryLoading,
    isStatusSummaryLoading,
    isExpenseIncomeSummaryLoading,
    isLoading,
    handleFilterChange,
  };
};

// New Customers

// Active Loans
// Closed Loans
// Total Borrowings

// Pending Loan Approvals
// Pending Borrowing Approvals
// Today's Collections

// Show total income vs total expense
// Show profit/loss per month
