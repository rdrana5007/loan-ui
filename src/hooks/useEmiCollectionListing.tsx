"use client";
import { EmiCollectionRow, ListParams } from "@/types";
import { TableProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants";
import { useEmiCollectionsByLoanQuery } from "@/api";

interface UseEmiCollectionListingParams {
  loanId: string | number | null;
}

export const useEmiCollectionListing = ({
  loanId,
}: UseEmiCollectionListingParams) => {
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_PAGE_SIZE);

  const listParams = useMemo((): ListParams => {
    const params: ListParams = {
      page,
      pageSize: rowsPerPage,
    };
    return params;
  }, [page, rowsPerPage]);

  const id = Number(loanId);
  const { data: queryData, isLoading } = useEmiCollectionsByLoanQuery(
    id,
    listParams,
  );

  const data = queryData?.items ?? [];
  const pageInfo = queryData?.page_info;

  const pagination = useMemo(
    () => ({
      current: pageInfo?.current_page ?? page,
      pageSize: pageInfo?.page_size ?? rowsPerPage,
      total: pageInfo?.total_count ?? data.length,
    }),
    [pageInfo, page, rowsPerPage, data],
  );

  const handleTableChange: TableProps<EmiCollectionRow>["onChange"] =
    useCallback(
      (pagination: any) => {
        const newPage = pagination.current ?? DEFAULT_PAGE;
        const newPageSize = pagination.pageSize ?? DEFAULT_PAGE_SIZE;

        if (newPageSize !== rowsPerPage) {
          setPage(DEFAULT_PAGE);
          setRowsPerPage(newPageSize);
        } else {
          setPage(newPage);
        }
      },
      [rowsPerPage],
    );

  return {
    data,
    isLoading,
    pagination,
    handleTableChange,
  };
};
