import { CustomerFormContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Customer",
  description: "Customer module for view, manage and update customer details.",
  robots: {
    index: false,
    follow: false
  }
};

export default function CustomerEditPage() {
  return <CustomerFormContainer />;
};