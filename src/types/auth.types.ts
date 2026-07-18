export interface LoginPayload {
  email: string;
  password: string;
};

export interface LoginFormValue {
  email: string;
  password: string;
};

export interface UserProfile {
  id: number;
  roleId: number;
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  roleName: string;
  isActive: boolean;
  signInProvider: string | null;
};

export interface LoginResponse {
  token: string;
  user: UserProfile;
};