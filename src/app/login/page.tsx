import { LoginContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to access the HNH Loan Portal.",
  robots: {
    index: false,
    follow: false
  }
};

export default function LoginPage() {
  return <LoginContainer />;
};