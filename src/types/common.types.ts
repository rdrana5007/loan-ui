export type StatusFilter = "all" | "active" | "inactive";

export type OptionItem = {
  label: string;
  value: string;
};

export interface ListParams {
  search?: string;
  page?: number;
  pageSize?: number;
};

export interface PaginationInfo {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_count: number;
};