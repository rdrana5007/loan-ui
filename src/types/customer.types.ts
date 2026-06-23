import { ListParams, PaginationInfo } from "./common.types";

export type CustomergGender = "male" | "female" | "other";

interface CustomerDocument {
  id: number;
  customerId: number;
  aadhaarNumber: string;
  panNumber: string;
  aadhaarFile: string;
  panFile: string;
  verificationStatus: "pending" | "verified" | "rejected";
  remarks: string;
}

interface CreatedBy {
  id: number;
  roleId: number;
  fullName: string;
}

export interface CustomerApiRecord {
  id: number;
  createdBy: number;
  customerCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: CustomergGender;
  address: string;
  city: string;
  state: string;
  pincode: string;
  profileImage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  customer_documents: CustomerDocument;
  created_by: CreatedBy;
};

export interface CustomerPaginatedResponse {
  page_info: PaginationInfo;
  items: CustomerApiRecord[];
};

export interface CustomerListParams extends ListParams {
  verificationStatus?: "pending" | "verified" | "rejected";
  status?: boolean;
};

export type CustomerRow = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: CustomergGender;
  address: string;
  city: string;
  state: string;
  pincode: string;
  profileImage: string;
  isActive: boolean;
  createdAt: string;
};

export interface CustomerFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: CustomergGender;
  address: string;
  city: string;
  state: string;
  pincode: string;
  profileImage: string;
  isActive: boolean;
};