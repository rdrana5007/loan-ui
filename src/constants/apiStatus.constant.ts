// Customer verification status
export const CUSTOMER_VERIFICATION_STATUS = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
} as const;

// Loan status
export const LOAN_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  ACTIVE: "active",
  CLOSED: "closed",
  DEFAULTED: "defaulted",
} as const;
