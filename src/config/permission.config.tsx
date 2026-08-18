export const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  COLLECTOR: "Collector",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ALL_ROLES: UserRole[] = [
  ROLES.ADMIN,
  ROLES.MANAGER,
  ROLES.COLLECTOR,
] as const;

export const ROLE_ROUTES: Record<string, UserRole[]> = {
  "/": ALL_ROLES,
  "/users": ALL_ROLES,
  "/customers": ALL_ROLES,
  "/loans": ALL_ROLES,
};
