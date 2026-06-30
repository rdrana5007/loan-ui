import { LoanStatus, OptionItem } from "@/types";

// User role filter
export const userRole: OptionItem[] = [
  { label: "All Users", value: "all" },
  { label: "Manager", value: "isManager" },
  { label: "Collector", value: "isCollector" },
];

// User status filter
export const userStatus: OptionItem[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

// Customer verification status filter
export const customerVerificationStatus: OptionItem[] = [
  { label: "Verification Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Verified", value: "verified" },
  { label: "Rejected", value: "rejected" }
];

// Loan status filter
export const loanStatus: OptionItem[] = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Active", value: "active" },
  { label: "Closed", value: "closed" },
  { label: "Defaulted", value: "defaulted" }
];