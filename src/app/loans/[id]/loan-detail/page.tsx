import { LoanDetailContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Details",
  description: "Loan Details module for managing EMI schedules, collections, and follow-up activities.",
  robots: {
    index: false,
    follow: false
  }
};

export default function LoanDetailPage() {
  return <LoanDetailContainer />;
};