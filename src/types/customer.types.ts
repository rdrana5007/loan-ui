import { ListParams, PaginationInfo } from "./common.types";

export type VerificationFilter = "all" | "pending" | "verified" | "rejected";
export type VerificationStatus = "pending" | "verified" | "rejected";
export type CustomergGender = "male" | "female" | "other";

interface CustomerDocument {
  id: number;
  customerId: number;
  aadhaarNumber: string;
  panNumber: string;
  aadhaarFile: string;
  panFile: string;
  verificationStatus: VerificationStatus;
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
  verificationStatus?: VerificationStatus;
  status?: boolean;
};

export type CustomerRow = {
  id: number;
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
  customer_documents: CustomerDocument;
  created_by: CreatedBy;
};

export interface fileImageData {
  uid: string;
  name: string;
  status: "uploading" | "done" | "error" | "removed";
  url: string;
}

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
  profileImage: fileImageData[];
  isActive: boolean;
  aadhaarNumber: string;
  panNumber: string;
  verificationStatus: string;
  remarks: string;
  aadhaarFile: fileImageData[];
  panFile: fileImageData[];
};