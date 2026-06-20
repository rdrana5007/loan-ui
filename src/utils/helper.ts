// format date time
export const formatDateTime = (value: string | number | Date): string => {
  return new Date(value)
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
    .replace(",", "");
};

export const resolveNumericJobId = (param?: string): number | null => {
  if (!param) return null;
  const parsed = Number(param);
  if (!Number.isNaN(parsed) && Number.isFinite(parsed)) return parsed;
  return null;
};