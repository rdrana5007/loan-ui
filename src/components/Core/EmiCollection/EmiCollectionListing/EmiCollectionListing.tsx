"use client";
import {
  AppButton,
  AppTable,
  AppTag,
  FilterInput,
  SearchInput,
} from "@/components/Common";
import { paymentMethodStatus } from "@/constants";
import { useEmiCollectionListing, usePageBreadcrumbs } from "@/hooks";
import { EmiCollectionRow, PaymentMethodStatus } from "@/types";
import { formatters } from "@/utils";
import { EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";

interface EmiCollectionListingProps {
  title: string;
  breadcrumbs?: string[];
}

export const EmiCollectionListing: FC<EmiCollectionListingProps> = ({
  title,
  breadcrumbs,
}) => {
  const router = useRouter();
  usePageBreadcrumbs(title, breadcrumbs);
  const {
    data,
    isLoading,
    pagination,
    searchValue,
    paymentmethodFilter,
    handleFilterChange,
    handleTableChange,
  } = useEmiCollectionListing();

  const handleSearch = useCallback(
    (value: string) => {
      handleFilterChange?.("search", value);
    },
    [handleFilterChange],
  );

  const renderActions = useCallback(
    (_: unknown, row: EmiCollectionRow) => (
      <div className="flex items-center justify-center">
        <EditOutlined
          onClick={() => router.push(`/emi-collections/${row.id}`)}
          className="cursor-pointer text-blue-500! hover:bg-blue-50! hover:text-blue-600! p-2 rounded-full text-lg md:text-xl transition-all"
        />
      </div>
    ),
    [router, openDeleteModal],
  );
const renderPaymentMethodTag = (val?: PaymentMethodStatus) => (
  <AppTag value={val} options={paymentMethodStatus} />
);
  const columns = useMemo(
    () => [
      {
        title: "Customer",
        dataIndex: "customerName",
        key: "customerName",
        width: 200,
        render: formatters.value,
      },
      {
        title: "Collected Amount",
        dataIndex: "collectedAmount",
        key: "collectedAmount",
        width: 180,
        render: (value: number) => `₹${Number(value).toLocaleString("en-IN")}`,
      },
      {
        title: "Payment Method",
        dataIndex: "paymentMethod",
        key: "paymentMethod",
        width: 150,
        render: renderPaymentMethodTag,
      },
      {
        title: "Transaction Reference",
        dataIndex: "transactionReference",
        key: "transactionReference",
        width: 220,
        render: formatters.value,
      },
      {
        title: "Collection Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: formatters.dateTime,
      },
    ],
    [],
  );

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-semibold">
            EMI Collection Listing
          </h2>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full xl:w-auto">
            <div className="w-full sm:flex-1 lg:w-80">
              <SearchInput
                prefixIcon={<SearchOutlined />}
                value={searchValue}
                className="w-full h-10!"
                onSearch={handleSearch}
              />
            </div>

            <div className="w-full sm:w-48">
              <FilterInput
                placeholder="Payment Method"
                filterKey="paymentMethod"
                value={paymentmethodFilter}
                options={paymentMethodStatus}
                className="w-full h-10!"
                onChange={handleFilterChange}
              />
            </div>

            <AppButton
              icon={<PlusOutlined />}
              label="New Collection"
              className="w-full sm:w-auto h-10! px-4"
              onClick={() => router.push("/emi-collections/add-emi-collection")}
            />
          </div>
        </div>
      </div>
      <AppTable
        rowKey={(record: any) => record.id}
        tableColumns={columns}
        tableData={data}
        pagination={pagination}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </>
  );
};
