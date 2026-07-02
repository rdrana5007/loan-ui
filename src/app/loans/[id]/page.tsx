import { LoanFormContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loans",
  description: "Loan module for managing and organizing data efficiently.",
  robots: {
    index: false,
    follow: false
  }
};

export default function CustomerEditPage() {
  return <LoanFormContainer />;
};