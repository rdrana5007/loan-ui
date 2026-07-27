"use client";
import { useCustomersQuery, useLoansQuery, useUsersQuery } from "@/api";
import {
  CUSTOMER_VERIFICATION_STATUS,
  DASHBOARD_PAGE_SIZE,
  DEFAULT_PAGE,
  LOAN_STATUS,
} from "@/constants";
import { CustomerListParams, LoanListParams, UserListParams } from "@/types";
import { useMemo } from "react";

export const useDashboard = () => {
  const userListParams = useMemo<UserListParams>(
    () => ({
      page: DEFAULT_PAGE,
      pageSize: DASHBOARD_PAGE_SIZE,
      status: true,
    }),
    [],
  );

  const customerListParams = useMemo<CustomerListParams>(
    () => ({
      page: DEFAULT_PAGE,
      pageSize: DASHBOARD_PAGE_SIZE,
      verificationStatus: CUSTOMER_VERIFICATION_STATUS.VERIFIED,
      status: true,
    }),
    [],
  );

  const loanListParams = useMemo<LoanListParams>(
    () => ({
      page: DEFAULT_PAGE,
      pageSize: DASHBOARD_PAGE_SIZE,
      status: LOAN_STATUS.ACTIVE,
    }),
    [],
  );

  const { data: userData, isLoading: isUserLoading } =
    useUsersQuery(userListParams);
  const { data: customerData, isLoading: isCustomerLoading } =
    useCustomersQuery(customerListParams);
  const { data: loanData, isLoading: isLoanLoading } =
    useLoansQuery(loanListParams);

  const users = userData?.items ?? [];
  const customers = customerData?.items ?? [];
  const loans = loanData?.items ?? [];

  const isLoading: boolean =
    isUserLoading || isCustomerLoading || isLoanLoading;

  return { users, customers, loans, isLoading };
};
