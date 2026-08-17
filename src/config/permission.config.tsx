export const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  COLLECTOR: "Collector",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_ROUTES: Record<string, UserRole[]> = {
  "/": [ROLES.ADMIN, ROLES.MANAGER, ROLES.COLLECTOR],
  "/users": [ROLES.ADMIN, ROLES.MANAGER],
  "/customers": [ROLES.ADMIN, ROLES.MANAGER],
  "/loans": [ROLES.ADMIN, ROLES.MANAGER, ROLES.COLLECTOR],
};
