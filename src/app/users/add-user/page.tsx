import { UserFormContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "User module for managing and organizing data efficiently.",
  robots: {
    index: false,
    follow: false
  }
};

export default function UserCreatePage() {
  return <UserFormContainer />;
};