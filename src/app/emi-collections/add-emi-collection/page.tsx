import {  } from "@/components";
import { EmiCollectionFormContainer } from "@/components/Containers/EmiCollection/EmiCollectionFormContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMI Collection - Add EMI Collection",
  description: "EMI Collection module for adding EMI Collection",
  robots: {
    index: false,
    follow: false
  }
};

export default function EmiCollectionCreatePage() {
  return <EmiCollectionFormContainer />;
};