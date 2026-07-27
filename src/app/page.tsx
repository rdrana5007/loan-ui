import { DashboardContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | HNH Loan Portal",
  description: "Centralized dashboard for monitoring users, customers and loans.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Home() {
  return <DashboardContainer />;
};