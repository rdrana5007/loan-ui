interface Role {
  id: number;
  name: string;
}

export interface ProfileResponse {
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
  roles: Role;
};