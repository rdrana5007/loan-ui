import { PaginationInfo } from "./common.types";

export type EmiPaymentMethod = "cash" | "upi" | "bank" | "cheque";

interface EmiSchedule {
  id: number;
  installmentNo: number;
  emiScheduleAmount: string;
  dueDate: string;
}

interface EmiCollectionItem {
  id: number;
  emiCollectionId: number;
  emiScheduleId: number;
  amount: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  emi_schedules: EmiSchedule;
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

interface EmiCollectionApiRecord {
  id: number;
  loanId: number;
  customerId: number;
  collectorId: number;
  totalAmount: string;
  paymentMethod: EmiPaymentMethod;
  transactionReference: string;
  remarks: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  emi_collection_items: EmiCollectionItem[];
  customers: Customer;
  created_by: CreatedBy;
}

export interface EmiCollectionPaginatedResponse {
  page_info: PaginationInfo;
  items: EmiCollectionApiRecord[];
}

export type EmiCollectionRow = {
  id: number;
  totalAmount: string;
  paymentMethod: EmiPaymentMethod;
  transactionReference: string;
  remarks: string;
  createdAt: string;
  emi_collection_items: EmiCollectionItem[];
};

export interface EmiCollectionFormValues {
  loanId?: number;
  customerId?: number;
  totalAmount: number;
  paymentMethod: EmiPaymentMethod;
  transactionReference: string;
  remarks?: string;
}

export type EmiCollectionItemRow = {
  id: number;
  emiScheduleId: number;
  amount: string;
  emiScheduleAmount: string;
  dueDate: string;
};