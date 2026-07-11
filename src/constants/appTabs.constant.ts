import { TabsProps } from "antd";

export const repaymentFrequencyTabs: TabsProps["items"] = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

export const loanEmiTabs: TabsProps["items"] = [
  { key: "scheduling", label: "EMI Scheduling" },
  { key: "collection", label: "EMI Collection" },
  // { key: "followup", label: "EMI Followup" },
];

// export const loanEmiTabs: TabsProps["items"] = [
//   { key: "scheduling", label: "Tab 1" },
//   { key: "collection", label: "Tab 2" },
//   // { key: "followup", label: "Tab 3" },
// ];