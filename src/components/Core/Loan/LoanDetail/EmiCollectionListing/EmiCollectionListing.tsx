"use client";
import { AppButton, AppTable, AppTag } from "@/components/Common";
import { paymentMethodList } from "@/constants";
import { useEmiCollectionListing, useResponsive } from "@/hooks";
import { EmiCollectionRow, PaymentMethod } from "@/types";
import { formatters, resolveNumericId } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

type ModalState = {
  open: boolean;
  row?: EmiCollectionRow | null;
};

const renderPaymentMethodTag = (val?: PaymentMethod) => (
  <AppTag value={val} options={paymentMethodList} variant="outlined" />
);

export const EmiCollectionListing = () => {
  const params = useParams<{ id: string }>();
  const { isMobile } = useResponsive();

  const id: string = params?.id;
  const loanId = useMemo(() => resolveNumericId(id), [id]);

  const { data, isLoading, pagination, handleTableChange } =
    useEmiCollectionListing({ loanId });

  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    row: null,
  });

  const closeModal = useCallback(() => {
    setModalState({
      open: false,
      row: null,
    });
  }, []);

  const openModal = useCallback((row?: EmiCollectionRow) => {
    setModalState({
      open: true,
      row,
    });
  }, []);

  const renderActions = useCallback(
    (_: unknown, row: EmiCollectionRow) => (
      <div className="flex justify-center">
        <AppButton
          size="small"
          label="View"
          className="rounded-md bg-blue-100! text-blue-700! hover:bg-blue-200! border-0!"
          onClick={() => openModal(row)}
        />
      </div>
    ),
    [openModal],
  );

  const columns = useMemo<ColumnsType<EmiCollectionRow>>(
    () => [
      {
        title: "Receipt No.",
        dataIndex: "id",
        key: "id",
        fixed: !isMobile ? "left" : undefined,
        width: 150,
        render: formatters.receiptNo,
      },
      {
        title: "Collected Amount",
        dataIndex: "collectedAmount",
        key: "collectedAmount",
        width: 180,
        render: formatters.currency,
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
        width: 200,
        render: formatters.value,
      },
      {
        title: "Created Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: formatters.dateTime,
      },
      // {
      //   title: "Action",
      //   dataIndex: "action",
      //   key: "action",
      //   align: "center",
      //   fixed: "right",
      //   width: 50,
      //   render: renderActions,
      // },
    ],
    [isMobile, renderActions],
  );

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg md:text-xl font-semibold">
            EMI Collection Listing
            {/* Listing */}
          </h2>
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
