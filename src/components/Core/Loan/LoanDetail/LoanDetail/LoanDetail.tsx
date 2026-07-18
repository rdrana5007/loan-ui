"use client";
import { AppTabs } from "@/components/Common";
import { loanEmiTabs } from "@/constants";
import { useEmiScheduleListing, usePageBreadcrumbs } from "@/hooks";
import { resolveNumericId } from "@/utils";
import { useParams } from "next/navigation";
import { ComponentType, FC, useMemo, useState } from "react";
import { EmiScheduleListing } from "../EmiScheduleListing";
import { EmiCollectionListing } from "../EmiCollectionListing";
import { EmiFollowUpListing } from "../EmiFollowUpListing";

type LoanEmiTab = "schedule" | "collection" | "followUp";

const tabComponents: Record<LoanEmiTab, ComponentType> = {
  schedule: EmiScheduleListing,
  collection: EmiCollectionListing,
  followUp: EmiFollowUpListing,
};

interface LoanDetailProps {
  breadcrumbs?: string[];
}

export const LoanDetail: FC<LoanDetailProps> = ({ breadcrumbs }) => {
  const params = useParams<{ id: string }>();

  const id: string = params?.id;
  const loanId = useMemo(() => resolveNumericId(id), [id]);

  const { loanData } = useEmiScheduleListing({ loanId });

  const title: string = loanData?.loanNumber || "Loan Detail";
  usePageBreadcrumbs(title, breadcrumbs, "Loans");

  const [activeTab, setActiveTab] = useState<LoanEmiTab>("schedule");

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <>
      <AppTabs
        items={loanEmiTabs}
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as LoanEmiTab)}
      />
      <ActiveTabComponent />
    </>
  );
};
