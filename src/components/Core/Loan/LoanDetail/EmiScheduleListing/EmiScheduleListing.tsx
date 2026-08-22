"use client";
import {
  AppButton,
  AppModal,
  AppTable,
  AppTag,
  FilterInput,
} from "@/components/Common";
import { useEmiScheduleListing, useResponsive } from "@/hooks";
import { formatters, resolveNumericId } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useParams } from "next/navigation";
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { CollectEmiModal } from "../CollectEmiModal";
import { ViewEmiScheduleModal } from "../ViewEmiScheduleModal";
import { FollowUpModal } from "../FollowUpModal";
import { EmiScheduleRow, EmiScheduleStatus } from "@/types";
import { emiScheduleStatus, emiScheduleStatusList } from "@/constants";
import { PlusOutlined } from "@ant-design/icons";

type EmiModalType = "view" | "collect" | "followUp";

type ModalState = {
  open: boolean;
  type: EmiModalType | null;
  row?: EmiScheduleRow | null;
};

type ModalContentConfig = {
  component: ReactNode;
  width?: number | string;
  style?: CSSProperties;
};

const MODAL_TITLES: Record<EmiModalType, string> = {
  view: "EMI Details",
  collect: "Create EMI Collection",
  followUp: "Create Follow-up",
};

const renderStatusTag = (val?: EmiScheduleStatus) => (
  <AppTag value={val} options={emiScheduleStatusList} />
);

export const EmiScheduleListing = () => {
  const params = useParams<{ id: string }>();
  const { isMobile } = useResponsive();

  const id: string = params?.id;
  const loanId = useMemo(() => resolveNumericId(id), [id]);

  const {
    data,
    loanData,
    isLoading,
    pagination,
    statusFilter,
    refetch,
    handleFilterChange,
    handleTableChange,
  } = useEmiScheduleListing({ loanId });

  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    type: null,
    row: null,
  });

  const closeModal = useCallback(() => {
    setModalState({ open: false, type: null, row: null });
  }, []);

  const openModal = useCallback((type: EmiModalType, row?: EmiScheduleRow) => {
    setModalState({ open: true, type, row });
  }, []);

  const modalTitle = modalState.type ? MODAL_TITLES[modalState.type] : "";

  const modalContentConfig: Record<EmiModalType, ModalContentConfig> = {
    view: {
      component: (
        <ViewEmiScheduleModal data={modalState.row} onClose={closeModal} />
      ),
      width: 800,
      style: { maxWidth: "95vw" },
    },
    collect: {
      component: (
        <CollectEmiModal
          loanData={loanData}
          refetch={refetch}
          onClose={closeModal}
        />
      ),
    },
    followUp: {
      component: (
        <FollowUpModal
          emiId={modalState.row?.id}
          loanData={loanData}
          refetch={refetch}
          onClose={closeModal}
        />
      ),
    },
  };

  const config = modalState.type ? modalContentConfig[modalState.type] : null;

  const renderActions = useCallback(
    (_: unknown, row: EmiScheduleRow) => (
      <div className="flex flex-wrap items-center gap-2">
        <AppButton
          size="small"
          label="View"
          className="rounded-md bg-blue-100! text-blue-700! hover:bg-blue-200! border-0!"
          onClick={() => openModal("view", row)}
        />
        {row?.status !== "paid" && !row?.emi_followups && (
          <AppButton
            size="small"
            label="Follow-up"
            className="rounded-md bg-amber-100! text-amber-700! hover:bg-amber-200! border-0!"
            onClick={() => openModal("followUp", row)}
          />
        )}
      </div>
    ),
    [openModal],
  );

  const columns = useMemo<ColumnsType<EmiScheduleRow>>(
    () => [
      {
        title: "Installment",
        dataIndex: "installmentNo",
        key: "installmentNo",
        fixed: !isMobile ? "left" : undefined,
        width: 100,
        render: formatters.installmentNo,
      },
      {
        title: "EMI Amount",
        dataIndex: "emiScheduleAmount",
        key: "emiScheduleAmount",
        width: 180,
        render: formatters.currency,
      },
      {
        title: "Principal Amount",
        dataIndex: "principalAmount",
        key: "principalAmount",
        width: 180,
        render: formatters.currency,
      },
      {
        title: "Interest Amount",
        dataIndex: "interestAmount",
        key: "interestAmount",
        width: 180,
        render: formatters.currency,
      },
      {
        title: "Paid Amount",
        dataIndex: "paidAmount",
        key: "paidAmount",
        width: 180,
        render: formatters.currency,
      },
      {
        title: "Balance Amount",
        dataIndex: "balanceAmount",
        key: "balanceAmount",
        width: 180,
        render: formatters.currency,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 150,
        render: renderStatusTag,
      },
      {
        title: "Due Date",
        dataIndex: "dueDate",
        key: "dueDate",
        width: 180,
        render: formatters.date,
      },
      {
        title: "Paid Date",
        dataIndex: "paidDate",
        key: "paidDate",
        width: 180,
        render: formatters.date,
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        fixed: !isMobile ? "right" : undefined,
        render: renderActions,
      },
    ],
    [isMobile, renderActions],
  );

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
          <h2 className="text-lg md:text-xl font-semibold">
            EMI Schedule Listing
            {/* Listing */}
          </h2>
          <div className="w-full sm:w-64">
            <FilterInput
              placeholder="All Status"
              filterKey="status"
              value={statusFilter}
              options={emiScheduleStatus}
              className="w-full h-10!"
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="w-full sm:w-auto sm:ml-auto text-right">
          <AppButton
            icon={<PlusOutlined />}
            label="Collect EMI"
            className="w-full sm:w-auto h-10! px-4 shrink-0 whitespace-nowrap"
            onClick={() => openModal("collect")}
          />
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
        title={modalTitle}
        onClose={closeModal}
        width={config?.width}
        style={config?.style}
      >
        {config?.component}
      </AppModal>
    </>
  );
};
