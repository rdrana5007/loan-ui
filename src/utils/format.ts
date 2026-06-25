import { formatDateTime } from "./helper";

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "--";
  return String(value);
};

const formatDateValue = (value?: string): string => {
  return value ? formatDateTime(value) : "--";
};

export const formatters = {
  value: formatValue,
  date: formatDateValue
};