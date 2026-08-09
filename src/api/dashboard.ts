import { DASHBOARD_KEYS } from "@/constants";
import { DashboardService } from "@/services";
import {
  DashboardExpenseIncomeSummary,
  DashboardParams,
  DashboardStatusSummary,
  DashboardSummary,
} from "@/types";
import { useQuery } from "@tanstack/react-query";

const dashboardService = new DashboardService();

export const useDashboardSummaryQuery = (params?: DashboardParams) => {
  return useQuery<DashboardSummary>({
    queryKey: [...DASHBOARD_KEYS.summary, params?.period],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await dashboardService.getDashboardSummary(params);
      const payload = response.data?.data;
      return payload;
    },
  });
};

export const useDashboardStatusSummaryQuery = (params?: DashboardParams) => {
  return useQuery<DashboardStatusSummary>({
    queryKey: [...DASHBOARD_KEYS.status, params?.period],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await dashboardService.getDashboardStatusSummary(params);
      const payload = response.data?.data;
      return payload;
    },
  });
};

export const useDashboardExpenseIncomeSummaryQuery = () => {
  return useQuery<DashboardExpenseIncomeSummary>({
    queryKey: DASHBOARD_KEYS.expense_income,
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await dashboardService.getDashboardExpenseIncomeSummary();
      const payload = response.data?.data;
      return payload;
    },
  });
};
