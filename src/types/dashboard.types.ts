import { type ComponentType } from "react";

export type TimePeriodFilter =
  | "today"
  | "last_week"
  | "last_15_days"
  | "last_month"
  | "last_3_months"
  | "last_6_months"
  | "last_year";
export const DefaultTimePeriodFilter: TimePeriodFilter = "today";

interface CountStats {
  total: number;
  inPeriod: number;
}

interface StatusCount {
  status: string;
  count: number;
}

interface Users {
  managers: CountStats;
  collectors: CountStats;
}

interface Loans extends CountStats {
  pending: number;
  active: number;
  closed: number;
}

interface Borrowings extends CountStats {
  pending: number;
}

interface Finance {
  expense: number;
  income: number;
  netIncome: number;
  profit: number;
  loss: number;
}

interface ExpenseRequests {
  pending: number;
}

export interface DashboardSummary {
  customers: CountStats;
  counterparties: CountStats;
  users: Users;
  loans: Loans;
  emiCollected: number;
  borrowings: Borrowings;
  finance: Finance;
  expenseRequests: ExpenseRequests;
}

export interface DashboardStatusSummary {
  loan: StatusCount[];
  borrowing: StatusCount[];
  emiFollowup: StatusCount[];
}

export interface DashboardExpenseIncomeSummary {
  month: string;
  income: number;
  expense: number;
}

export interface DashboardParams {
  period?: TimePeriodFilter | "today";
}

export interface DashboardCardItem {
  title: string;
  count: number;
  icon: ComponentType<{ className?: string }>;
}

export interface StatusChartItem {
  type: string;
  value: number;
}

export interface IncomeExpenseChartItem {
  month: string;
  type: "Income" | "Expense";
  value: number;
}