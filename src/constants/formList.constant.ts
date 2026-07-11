import {
  CustomerGender,
  EmiPaymentMethod,
  EmiSchedulingStatus,
  LoanProcessingFeeType,
  LoanRepaymentFrequency,
  LoanStatus,
  OptionItem,
  VerificationStatus,
} from "@/types";

type Role = {
  id: number;
  label: string;
  value: number;
};

// User role list
export const roleList: Role[] = [
  { id: 1, label: "Manager", value: 2 },
  { id: 2, label: "Collector", value: 3 },
];

// Customer verification status list
export const customerVerificationStatusList: OptionItem<VerificationStatus>[] =
  [
    { label: "Pending", value: "pending", color: "gold" },
    { label: "Verified", value: "verified", color: "green" },
    { label: "Rejected", value: "rejected", color: "red" },
  ];

// Customer gender list
export const customerGenderOptions: OptionItem<CustomerGender>[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

// Loan status list
export const loanStatusList: OptionItem<LoanStatus>[] = [
  { label: "Pending", value: "pending", color: "gold" },
  { label: "Approved", value: "approved", color: "green" },
  { label: "Rejected", value: "rejected", color: "red" },
  { label: "Active", value: "active", color: "blue" },
  { label: "Closed", value: "closed", color: "geekblue" },
  { label: "Defaulted", value: "defaulted", color: "default" },
];

// Loan processing fee type list
export const loanProcessingFeeTypeOptions: OptionItem<LoanProcessingFeeType>[] =
  [
    { label: "Flat", value: "flat" },
    { label: "Percentage", value: "percentage" },
  ];

// Loan repayment frequency list
export const loanRepaymentFrequencyList: OptionItem<LoanRepaymentFrequency>[] =
  [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

// Emi Scheduling status list
export const emiSchedulingStatusList: OptionItem<EmiSchedulingStatus>[] = [
  { label: "Pending", value: "pending", color: "gold" },
  { label: "Paid", value: "paid", color: "green" },
  { label: "Partial", value: "partial", color: "blue" },
  { label: "Overdue", value: "overdue", color: "red" },
];

// Emi Payment method list
export const emiPaymentMethodList: OptionItem<EmiPaymentMethod>[] = [
  { label: "Cash", value: "cash", color: "green" },
  { label: "UPI", value: "upi", color: "blue" },
  { label: "Cheque", value: "cheque", color: "orange" },
  { label: "Bank Transfer", value: "bank", color: "purple" },
];