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

// export interface ProfileChangePayload {
//   cur_pass?: string;
//   new_pass?: string;
//   name?: string;
//   phone?: string;
//   profile_photo?: File | null;
//   remove_profile_photo?: boolean;
// }

// export interface ChangePasswordModalProps {
//   PasswordModalOpen: boolean;
//   PasswordModalClose: () => void;
//   handleSubmit: (payload: {
//     cur_pass: string;
//     new_pass: string;
//   }) => Promise<boolean>;
//   isSubmitting?: boolean;
// }

// export interface ChangePasswordFormValues {
//   oldpassword: string;
//   newpassword: string;
//   confirmnewpassword: string;
// }

// export interface ProfileFormValues {
//   username: string;
//   fullname: string;
//   email: string;
//   phone: string;
// }

// export interface ProfilePhotoFieldProps {
//   existingPhotoUrl?: string;
//   displayName?: string;
//   onUpload: (file: File) => Promise<boolean>;
//   isUploading?: boolean;
// }