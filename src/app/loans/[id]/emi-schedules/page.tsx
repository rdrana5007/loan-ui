import { EmiScheduleContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emi Schedules",
  description: "Emi Schedule module for managing and organizing data efficiently.",
  robots: {
    index: false,
    follow: false
  }
};

export default function EmiSchedulePage() {
  return <EmiScheduleContainer />;
};