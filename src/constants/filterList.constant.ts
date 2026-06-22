type FilterOption = {
  label: string;
  value: string;
};

// User FilterOption filter
export const userRole: FilterOption[] = [
  { label: "All Users", value: "all users" },
  { label: "Manager", value: "isManager" },
  { label: "Collector", value: "isCollector" },
];

// User status filter
export const userStatus: FilterOption[] = [
  { label: "All Users", value: "all users" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];
