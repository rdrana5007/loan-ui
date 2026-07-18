import { ListParams, PaginationInfo } from "./common.types";
import { EmiFollowUpStatus } from "./emiFollowUp.types";

export type EmiScheduleStatus = "pending" | "paid" | "partial" | "overdue";
export type EmiScheduleStatusFilter = "all" | EmiScheduleStatus;

export interface LoanEmiApiRecord {
  id: number;
  customerId: number;
  collectorId: number;
  createdBy: number;
  loanNumber: string;
}

interface EmiFollowup {
  id: number;
  status: EmiFollowUpStatus;
}

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
  emi_followups: EmiFollowup[];
}

export interface EmiSchedulePaginatedResponse {
  loan: LoanEmiApiRecord;
  page_info: PaginationInfo;
  items: EmiScheduleApiRecord[];
}

export interface EmiScheduleListParams extends ListParams {
  status?: EmiScheduleStatus;
}

export type EmiScheduleRow = {
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
  emi_followups: EmiFollowup[];
};