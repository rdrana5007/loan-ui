import { PaginationInfo } from "./common.types";

export type PaymentMethod = "cash" | "upi" | "bank" | "cheque";

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

export interface EmiCollectionApiRecord {
  id: number;
  emiScheduleId: number;
  loanId: number;
  customerId: number;
  collectorId: number;
  collectedAmount: string;
  paymentMethod: PaymentMethod;
  transactionReference: string;
  remarks: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  customers: Customer;
  created_by: CreatedBy;
}

export interface EmiCollectionPaginatedResponse {
  page_info: PaginationInfo;
  items: EmiCollectionApiRecord[];
}

export type EmiCollectionRow = {
  id: number;
  collectedAmount: string;
  paymentMethod: PaymentMethod;
  transactionReference: string;
  createdAt: string;
};

export interface EmiCollectionFormValues {
  emiScheduleId?: number;
  loanId?: number;
  customerId?: number;
  collectedAmount: number;
  paymentMethod: PaymentMethod;
  transactionReference: string;
  remarks: string;
}