import {
  EmiScheduleStatus,
  LoanStatus,
  OptionItem,
  VerificationStatus,
} from "@/types";

type Role = {
  id: number;
  label: string;
  value: number;
};

// User role list
export const roleList: Role[] = [
  { id: 1, label: "Manager", value: 2 },
  { id: 2, label: "Collector", value: 3 },
];

// Customer verification status list
export const customerVerificationStatusList: OptionItem<VerificationStatus>[] =
  [
    { label: "Pending", value: "pending", color: "gold" },
    { label: "Verified", value: "verified", color: "green" },
    { label: "Rejected", value: "rejected", color: "red" },
  ];

// Customer gender list
export const customerGenderOptions: OptionItem[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

// Loan status list
export const loanStatusList: OptionItem<LoanStatus>[] = [
  { label: "Pending", value: "pending", color: "gold" },
  { label: "Approved", value: "approved", color: "green" },
  { label: "Rejected", value: "rejected", color: "red" },
  { label: "Active", value: "active", color: "blue" },
  { label: "Closed", value: "closed", color: "geekblue" },
  { label: "Defaulted", value: "defaulted", color: "default" },
];

// Emi Schedule status list
export const emiScheduleStatusList: OptionItem<EmiScheduleStatus>[] = [
  { label: "Pending", value: "pending", color: "gold" },
  { label: "Paid", value: "paid", color: "green" },
  { label: "Partial", value: "partial", color: "blue" },
  { label: "Overdue", value: "overdue", color: "red" },
];
