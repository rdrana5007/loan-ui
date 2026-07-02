import { Dayjs } from "dayjs";
import { ListParams, PaginationInfo } from "./common.types";
import { VerificationStatus } from "./customer.types";

export type LoanStatus = "pending" | "approved" | "rejected" | "active" | "closed" | "defaulted";
export type LoanStatusFilter = "all" | LoanStatus;

interface CustomerDocument {
  id: number;
  customerId: number;
  verificationStatus: VerificationStatus;
}

interface Customer {
  id: number;
  createdBy: number;
  customerCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
  customer_documents: CustomerDocument;
}

interface User {
  id: number;
  roleId: number;
  fullName: string;
}

export interface LoanApiRecord {
  id: number;
  customerId: number;
  collectorId: number;
  createdBy: number;
  updatedBy: number | null;
  approvedBy: number | null;
  rejectedBy: number | null;
  closedBy: number | null;

  loanNumber: string;
  loanAmount: string;
  interestRate: string;
  tenureMonths: number;
  processingFee: string;
  disbursedAmount: string;
  status: LoanStatus;
  notes: string;
  rejectionReason: string | null;
  defaultReason: string | null;
  startDate: string;
  endDate: string;

  approvedAt: string | null;
  rejectedAt: string | null;
  disbursedAt: string | null;
  closedAt: string | null;
  defaultedAt: string | null;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  customers: Customer;
  collectors: User;

  created_by: User;
  updated_by: User | null;
  approved_by: User | null;
  rejected_by: User | null;
  closed_by: User | null;
};

export interface LoanPaginatedResponse {
  page_info: PaginationInfo;
  items: LoanApiRecord[];
};

export interface LoanListParams extends ListParams {
  status?: LoanStatus;
  fromDate?: string | null;
  toDate?: string | null;
};

export type LoanRow = {
  id: number;
  customerId: number;
  collectorId: number;
  createdBy: number;
  loanNumber: string;
  loanAmount: string;
  processingFee: string;
  disbursedAmount: string;
  interestRate: string;
  tenureMonths: number;
  status: LoanStatus;
  notes: string;
  rejectionReason: string | null;
  startDate: string;
  endDate: string;
  createdAt: string;
  customers: Customer;
  collectors: User;
  created_by: User;
};

export interface LoanPayload {
  customerId: number | null;
  collectorId: number | null;
  loanAmount: number;
  interestRate: number;
  tenureMonths: number;
  processingFee: number;
  disbursedAmount?: number | null;
  startDate: string | null;
  status: LoanStatus;
  notes: string;
  rejectionReason?: string | null;
}

export interface LoanFormValues {
  customerId: number | null;
  collectorId: number | null;
  loanAmount: string | number;
  interestRate: string | number;
  tenureMonths: string | number;
  processingFee: string | number;
  disbursedAmount?: string | number;
  startDate: Dayjs | null;
  endDate?: Dayjs | null;
  status: LoanStatus;
  notes: string;
  rejectionReason: string | null;
};