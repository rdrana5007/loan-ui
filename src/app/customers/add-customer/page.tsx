import { CustomerFormContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Customer",
  description: "Customer module for Create a new customer.",
  robots: {
    index: false,
    follow: false
  }
};

export default function CustomerCreatePage() {
  return <CustomerFormContainer />;
};