import { Dayjs } from "dayjs";
import { ListParams, PaginationInfo } from "./common.types";
import { VerificationStatus } from "./customer.types";

export type LoanStatus = "pending" | "approved" | "rejected" | "active" | "closed" | "defaulted";
export type LoanStatusFilter = "all" | LoanStatus;
export type LoanProcessingFeeType = "flat" | "percentage";
export type LoanRepaymentFrequency = "daily" | "weekly" | "monthly";

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
  installmentCount: number;
  processingFeeType: LoanProcessingFeeType;
  processingFee: string;
  disbursedAmount: string;
  repaymentFrequency: LoanRepaymentFrequency;
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
  repaymentFrequency?: LoanRepaymentFrequency;
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
  processingFeeType: LoanProcessingFeeType;
  processingFee: string;
  disbursedAmount: string;
  interestRate: string;
  installmentCount: number;
  repaymentFrequency: LoanRepaymentFrequency;
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
  installmentCount: number;
  processingFeeType: LoanProcessingFeeType;
  processingFee: number;
  repaymentFrequency: LoanRepaymentFrequency;
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
  installmentCount: string | number;
  processingFeeType: LoanProcessingFeeType;
  processingFee: string | number;
  disbursedAmount?: string | number;
  repaymentFrequency: LoanRepaymentFrequency;
  startDate: Dayjs | null;
  endDate?: Dayjs | null;
  status: LoanStatus;
  notes: string;
  rejectionReason: string | null;
};