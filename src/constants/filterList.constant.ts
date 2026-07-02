import { OptionItem } from "@/types";

// Filter keys
export const FILTER_KEYS = {
  SEARCH: "search",
  STATUS: "status",
  ROLE: "role",
  VERIFICATION: "verification",
  FROM_DATE: "fromDate",
  TO_DATE: "toDate",
} as const;

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
  { label: "Rejected", value: "rejected" },
];

// Loan status filter
export const loanStatus: OptionItem[] = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Active", value: "active" },
  { label: "Closed", value: "closed" },
  { label: "Defaulted", value: "defaulted" },
];

// Emi Schedule status filter
export const emiScheduleStatus: OptionItem[] = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Partial", value: "partial" },
  { label: "Overdue", value: "overdue" },
  { label: "Defaulted", value: "defaulted" }
];

export const paymentMethodStatus: OptionItem[] = [
  { label: "All Status", value: "all" },
  {label: "Cash",value: "cash",},
  {
    label: "UPI",
    value: "upi",
  },
  {
    label: "Cheque",
    value: "cheque",
  },
  {
    label: "Bank Transfer",
    value: "bank_transfer",
  },
];