type Role = {
  label: string;
  value: string;
};

// User role filter
export const userRole: Role[] = [
  { label: "All Users", value: "all users" },
  { label: "Manager", value: "isManager" },
  { label: "Collector", value: "isCollector" },
];