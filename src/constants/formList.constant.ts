import { FilterOption } from "./filterList.constant";

type Role = {
  id: number;
  label: string;
  value: number;
};

// User role list
export const roleList: Role[] = [
  { id: 1, label: "Manager", value: 2 },
  { id: 2, label: "Collector", value: 3 }
];

// Customer verification status list
export const customerVerificationStatusList: FilterOption[] = [
  { label: "Pending", value: "pending" },
  { label: "Verified", value: "verified" },
  { label: "Rejected", value: "rejected" }
];

// Customer gender list
export const customerGenderOptions: FilterOption[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" }
];