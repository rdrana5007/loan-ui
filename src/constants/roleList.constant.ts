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