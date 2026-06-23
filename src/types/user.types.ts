import { ListParams, PaginationInfo } from "./common.types";

interface UserRole {
  id: number;
  name: string;
}

export interface UserApiRecord {
  id: number;
  roleId: number;
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  signInProvider: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  roles: UserRole;
};

export interface UserPaginatedResponse {
  page_info: PaginationInfo;
  items: UserApiRecord[];
};

export interface UserListParams extends ListParams {
  isManager?: boolean;
  isCollector?: boolean;
  status?: boolean;
};

export type UserRow = {
  id: number;
  roleId: number;
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
};

export interface UserFormValues {
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  roleId: number | undefined;
  isActive: boolean;
};