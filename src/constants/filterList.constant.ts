export type FilterOption = {
  label: string;
  value: string;
};

// User role filter
export const userRole: FilterOption[] = [
  { label: "All Users", value: "all" },
  { label: "Manager", value: "isManager" },
  { label: "Collector", value: "isCollector" },
];

// User status filter
export const userStatus: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

// Customer verification status filter
export const customerVerificationStatus: FilterOption[] = [
  { label: "Verification Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Verified", value: "verified" },
  { label: "Rejected", value: "rejected" }
];