import { ListParams, PaginationInfo } from "./common.types";

export type EmiScheduleStatus = "pending" | "paid" | "partial" | "overdue";
export type EmiScheduleStatusFilter = "all" | EmiScheduleStatus;

interface EmiScheduleApiRecord {
  id: number;
  loanId: number;
  installmentNo: number;
  emiScheduleAmount: string;
  principalAmount: string;
  interestAmount: string;
  paidAmount: string;
  balanceAmount: string;
  status: EmiScheduleStatus;
  dueDate: string;
  paidDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EmiSchedulePaginatedResponse {
  loanNumber: string;
  page_info: PaginationInfo;
  items: EmiScheduleApiRecord[];
}

export interface EmiScheduleListParams extends ListParams {
  status?: EmiScheduleStatus;
}

export type EmiScheduleRow = {
  id: number;
  installmentNo: number;
  emiScheduleAmount: string;
  principalAmount: string;
  interestAmount: string;
  paidAmount: string;
  balanceAmount: string;
  status: EmiScheduleStatus;
  dueDate: string;
  paidDate: string | null;
};