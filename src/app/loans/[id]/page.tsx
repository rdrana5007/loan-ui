import { LoanFormContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Loan",
  description: "Loan module for view, manage and update loan details.",
  robots: {
    index: false,
    follow: false
  }
};

export default function CustomerEditPage() {
  return <LoanFormContainer />;
};