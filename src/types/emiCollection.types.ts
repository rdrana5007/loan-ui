import { ListParams, PaginationInfo } from "./common.types";

export type PaymentMethodFilter = "cash" | "upi" | "bank" | "cheque";
export type PaymentMethodStatus = "cash" | "upi" | "bank" | "cheque";

export interface EmiCollectionListParams extends ListParams {
    paymentMethod?: PaymentMethodFilter;
};

export interface EmiCollectionApiRecord {
    id: number;
    emiScheduledId: number;
    customerId: number;
    loanId: number;
    collectorId: number;
    collectedAmount: number;
    paymentMethod: PaymentMethodFilter;
    transactionRef: string;
    remarks: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export type EmiCollectionRow = {
    id: number;
    emiScheduledId: number;
    customerId: number;
    loanId: number;
    collectorId: number;
    collectedAmount: number;
    paymentMethod: PaymentMethodFilter;
    transactionRef: string;
    remarks: string;
    createdAt: string;
}

export interface emiCollectionPaginatedResponse {
  page_info: PaginationInfo;
  items: EmiCollectionApiRecord[];
};