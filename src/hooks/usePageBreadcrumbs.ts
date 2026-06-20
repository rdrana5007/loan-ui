"use client";
import { useEffect } from "react";
import { useBreadcrumbs } from "@/contexts";

export const usePageBreadcrumbs = (title?: string, breadcrumbs?: string[]) => {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    const items = breadcrumbs?.length ? breadcrumbs : title ? [title] : [];
    setBreadcrumbs(items);
    return () => setBreadcrumbs([]);
  }, [breadcrumbs, title, setBreadcrumbs]);
};