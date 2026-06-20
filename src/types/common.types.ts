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