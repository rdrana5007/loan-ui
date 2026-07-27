"use client";
import { AppButton, AppModal, AppTable, AppTag } from "@/components/Common";
import { emiPaymentMethodList } from "@/constants";
import { useEmiCollectionListing, useResponsive } from "@/hooks";
import { EmiCollectionRow, EmiPaymentMethod } from "@/types";
import { formatters, getInstallmentDisplay, resolveNumericId } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { ViewEmiCollectionModal } from "../ViewEmiCollectionModal";

type ModalState = {
  open: boolean;
  row?: EmiCollectionRow | null;
};

const renderPaymentMethodTag = (val?: EmiPaymentMethod) => (
  <AppTag value={val} options={emiPaymentMethodList} variant="outlined" />
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
    setModalState({ open: false, row: null });
  }, []);

  const openModal = useCallback((row?: EmiCollectionRow) => {
    setModalState({ open: true, row });
  }, []);

  const renderInstallments = useCallback(
    (_: unknown, row: EmiCollectionRow) =>
      getInstallmentDisplay(
        row.emi_collection_items?.map(
          (item) => item.emi_schedules?.installmentNo,
        ),
      ),
    [],
  );

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
        width: 120,
        render: formatters.receiptNo,
      },
      {
        title: "Installments",
        key: "installments",
        fixed: !isMobile ? "left" : undefined,
        width: 100,
        render: renderInstallments,
      },
      {
        title: "Collected Amount",
        dataIndex: "totalAmount",
        key: "totalAmount",
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
        title: "Collected Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: formatters.dateTime,
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        fixed: !isMobile ? "right" : undefined,
        width: 50,
        render: renderActions,
      },
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
      <AppModal
        isModalOpen={modalState.open}
        title="Collection Details"
        onClose={closeModal}
        width={800}
        style={{ maxWidth: "95vw" }}
      >
        <ViewEmiCollectionModal data={modalState.row} onClose={closeModal} />
      </AppModal>
    </>
  );
};
