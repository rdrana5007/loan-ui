import { ListParams, PaginationInfo } from "./common.types";

export type EmiSchedulingStatus = "pending" | "paid" | "partial" | "overdue";
export type EmiSchedulingStatusFilter = "all" | EmiSchedulingStatus;

export interface LoanEmiApiRecord {
  id: number;
  customerId: number;
  collectorId: number;
  createdBy: number;
  loanNumber: string;
}

interface EmiSchedulingApiRecord {
  id: number;
  loanId: number;
  installmentNo: number;
  emiScheduleAmount: string;
  principalAmount: string;
  interestAmount: string;
  paidAmount: string;
  balanceAmount: string;
  status: EmiSchedulingStatus;
  dueDate: string;
  paidDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EmiSchedulingPaginatedResponse {
  loan: LoanEmiApiRecord;
  page_info: PaginationInfo;
  items: EmiSchedulingApiRecord[];
}

export interface EmiSchedulingListParams extends ListParams {
  status?: EmiSchedulingStatus;
}

export type EmiSchedulingRow = {
  id: number;
  loanId: number;
  installmentNo: number;
  emiScheduleAmount: string;
  principalAmount: string;
  interestAmount: string;
  paidAmount: string;
  balanceAmount: string;
  status: EmiSchedulingStatus;
  dueDate: string;
  paidDate: string | null;
};