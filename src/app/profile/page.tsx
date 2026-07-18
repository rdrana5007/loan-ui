import { ProfileContainer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View and manage your profile information.",
  robots: {
    index: false,
    follow: false
  }
};

export default function ProfilePage() {
  return <ProfileContainer />;
};