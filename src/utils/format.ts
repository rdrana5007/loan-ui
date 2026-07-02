import { formatDate, formatDateTime } from "./helper";

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "--";
  return String(value);
};

const formatDateTimeValue = (value?: string): string => {
  return value ? formatDateTime(value) : "--";
};

const formatDateValue = (value?: string): string => {
  return value ? formatDate(value) : "--";
};

export const formatters = {
  value: formatValue,
  dateTime: formatDateTimeValue,
  date: formatDateValue
};