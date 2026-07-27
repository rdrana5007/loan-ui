import { LoanFormContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Loan",
  description: "Loan module for Create a new loan.",
  robots: {
    index: false,
    follow: false
  }
};

export default function CustomerCreatePage() {
  return <LoanFormContainer />;
};