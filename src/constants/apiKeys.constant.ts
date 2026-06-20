export const LOGIN_KEY = ["login"] as const;

export const USER_KEYS = {
  all: ["users"] as const,
  detail: (id: number) => ["users", "detail", id] as const
};