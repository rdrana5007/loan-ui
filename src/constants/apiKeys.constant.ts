export const LOGIN_KEY = ["login"] as const;

export const USER_KEYS = {
  all: ["users"] as const,
  detail: (id: number) => ["users", "detail", id] as const,
};

export const CUSTOMER_KEYS = {
  all: ["customers"] as const,
  detail: (id: number) => ["customers", "detail", id] as const,
};

export const LOAN_KEYS = {
  all: ["loans"] as const,
  detail: (id: number) => ["loans", "detail", id] as const,
  collectors: "loan-detail-collectors" as const,
  customers: "loan-detail-customers" as const,
};
