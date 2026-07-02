import {  } from "@/components";
import { EmiCollectionFormContainer } from "@/components/Containers/EmiCollection/EmiCollectionFormContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMI Collection - Detail EMI Collection",
  description: "EMI Collection module for viewing EMI Collection details",
  robots: {
    index: false,
    follow: false
  }
};

export default function EmiCollectionDetailPage() {
  return <EmiCollectionFormContainer />;
};