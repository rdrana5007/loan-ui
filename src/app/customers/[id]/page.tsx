import { CustomerFormContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
  description: "Customer module for managing and organizing data efficiently.",
  robots: {
    index: false,
    follow: false
  }
};

export default function CustomerEditPage() {
  return <CustomerFormContainer />;
};