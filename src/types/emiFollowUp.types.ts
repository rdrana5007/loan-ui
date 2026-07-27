import { Dayjs } from "dayjs";
import { ListParams, PaginationInfo } from "./common.types";

export type EmiFollowUpStatus = "pending" | "completed";
export type EmiFollowUpStatusFilter = "all" | EmiFollowUpStatus;
export type CommunicationType = "call" | "visit" | "sms" | "email" | "whatsapp";

interface EmiSchedule {
  id: number;
  installmentNo: number;
}

interface Customer {
  id: number;
  customerCode: string;
  firstName: string;
  lastName: string;
}

interface CreatedBy {
  id: number;
  roleId: number;
  fullName: string;
}

interface EmiFollowUpApiRecord {
  id: number;
  emiScheduleId: number;
  loanId: number;
  customerId: number;
  collectorId: number;
  communicationType: CommunicationType;
  status: EmiFollowUpStatus;
  remarks: string;
  followUpDate: string;
  nextFollowupDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  emi_schedules: EmiSchedule;
  customers: Customer;
  created_by: CreatedBy;
}

export interface EmiFollowUpPaginatedResponse {
  page_info: PaginationInfo;
  items: EmiFollowUpApiRecord[];
}

export interface EmiFollowUpListParams extends ListParams {
  status?: EmiFollowUpStatus;
}

export type EmiFollowUpRow = {
  id: number;
  communicationType: CommunicationType;
  status: EmiFollowUpStatus;
  followUpDate: string;
  nextFollowupDate: string;
  remarks: string;
  createdAt: string;
  emi_schedules: EmiSchedule;
};

export interface EmiFollowUpPayload {
  emiScheduleId?: number;
  loanId?: number;
  customerId?: number;
  communicationType: CommunicationType;
  status?: EmiFollowUpStatus;
  followUpDate: string | null;
  nextFollowupDate?: string | null;
  remarks: string;
}

export interface EmiFollowUpFormValues {
  emiScheduleId?: number;
  loanId?: number;
  customerId?: number;
  communicationType: CommunicationType;
  status?: EmiFollowUpStatus;
  followUpDate: Dayjs | null;
  nextFollowupDate?: Dayjs | null;
  remarks: string;
}