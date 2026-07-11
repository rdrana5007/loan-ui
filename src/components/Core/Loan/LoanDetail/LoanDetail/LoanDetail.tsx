"use client";
import { AppTabs } from "@/components/Common";
import { loanEmiTabs } from "@/constants";
import { useEmiSchedulingListing, usePageBreadcrumbs } from "@/hooks";
import { resolveNumericId } from "@/utils";
import { useParams } from "next/navigation";
import { ComponentType, FC, useMemo, useState } from "react";
import { EmiSchedulingListing } from "../EmiSchedulingListing";
import { EmiCollectionListing } from "../EmiCollectionListing";

// type LoanEmiTab = "scheduling" | "collection" | "followup";
type LoanEmiTab = "scheduling" | "collection";

const tabComponents: Record<LoanEmiTab, ComponentType> = {
  scheduling: EmiSchedulingListing,
  collection: EmiCollectionListing,
  // followup: EmiFollowupListing,
};

interface LoanDetailProps {
  breadcrumbs?: string[];
}

export const LoanDetail: FC<LoanDetailProps> = ({ breadcrumbs }) => {
  const params = useParams<{ id: string }>();

  const id: string = params?.id;
  const loanId = useMemo(() => resolveNumericId(id), [id]);

  const { loanData } = useEmiSchedulingListing({ loanId });

  const title: string = loanData?.loanNumber || "Loan Detail";
  usePageBreadcrumbs(title, breadcrumbs, "Loans");

  const [activeTab, setActiveTab] = useState<LoanEmiTab>("scheduling");

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
