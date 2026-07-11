"use client";
import {
  AppButton,
  AppModal,
  AppTable,
  AppTag,
  FilterInput,
} from "@/components/Common";
import { emiSchedulingStatus, emiSchedulingStatusList } from "@/constants";
import { useEmiSchedulingListing, useResponsive } from "@/hooks";
import { EmiSchedulingRow, EmiSchedulingStatus } from "@/types";
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

type EmiModalType = "view" | "collect" | "follow-up";

type ModalState = {
  open: boolean;
  type: EmiModalType | null;
  row?: EmiSchedulingRow | null;
};

type ModalContentConfig = {
  component: ReactNode;
  width?: number | string;
  style?: CSSProperties;
};

const MODAL_TITLES: Record<EmiModalType, string> = {
  view: "EMI Details",
  collect: "Create EMI Collection",
  "follow-up": "Follow-up",
};

const renderVerificationTag = (val?: EmiSchedulingStatus) => (
  <AppTag value={val} options={emiSchedulingStatusList} />
);

export const EmiSchedulingListing = () => {
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
  } = useEmiSchedulingListing({ loanId });

  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    type: null,
    row: null,
  });

  const closeModal = useCallback(() => {
    setModalState({
      open: false,
      type: null,
      row: null,
    });
  }, []);

  const openModal = useCallback(
    (type: EmiModalType, row?: EmiSchedulingRow) => {
      setModalState({
        open: true,
        type,
        row,
      });
    },
    [],
  );

  const modalTitle = modalState.type ? MODAL_TITLES[modalState.type] : "";

  const modalContentConfig: Record<EmiModalType, ModalContentConfig> = {
    view: {
      component: <ViewEmiScheduleModal data={modalState.row} onClose={closeModal} />,
      width: 800,
      style: { maxWidth: "95vw" }
    },
    collect: {
      component: (
        <CollectEmiModal
          data={modalState.row}
          loanData={loanData}
          refetch={refetch}
          onClose={closeModal}
        />
      )
    },
    "follow-up": {
      component: "<FollowUp row={modalState.row!} />",
    },
  };

  const config = modalState.type ? modalContentConfig[modalState.type] : null;

  const renderActions = useCallback(
    (_: unknown, row: EmiSchedulingRow) => (
      <div className="flex flex-wrap items-center gap-2">
        <AppButton
          size="small"
          label="View"
          className="rounded-md bg-blue-100! text-blue-700! hover:bg-blue-200! border-0!"
          onClick={() => openModal("view", row)}
        />
        <AppButton
          size="small"
          label="Collect"
          className="rounded-md bg-green-100! text-green-700! hover:bg-green-200! border-0!"
          onClick={() => openModal("collect", row)}
        />
        {/* <AppButton
          size="small"
          label="Follow-up"
          className="rounded-md bg-amber-100! text-amber-700! hover:bg-amber-200! border-0!"
          onClick={() => openModal("follow-up")}
        /> */}
      </div>
    ),
    [openModal],
  );

  const columns = useMemo<ColumnsType<EmiSchedulingRow>>(
    () => [
      {
        title: "Installment No.",
        dataIndex: "installmentNo",
        key: "installmentNo",
        fixed: !isMobile ? "left" : undefined,
        width: 150,
        render: formatters.value,
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
        render: renderVerificationTag,
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
        fixed: "right",
        render: renderActions,
      },
    ],
    [isMobile, renderActions],
  );

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-semibold">
            EMI Schedule Listing
            {/* Listing */}
          </h2>
          <div className="w-full sm:w-64">
            <FilterInput
              placeholder="All Status"
              filterKey="status"
              value={statusFilter}
              options={emiSchedulingStatus}
              className="w-full h-10!"
              onChange={handleFilterChange}
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

// import dayjs from "dayjs";

// const canCollectEmi = (
//   status: EmiSchedulingStatus,
//   dueDate: string // e.g. "2026-07-10"
// ) => {
//   const today = dayjs().startOf("day");
//   const due = dayjs(dueDate).startOf("day");

//   const isFuture = due.isAfter(today);

//   return !isFuture && ["pending", "partial", "overdue"].includes(status);
// };

// {canCollectEmi(emi.status, emi.dueDate) && (
//   <button>Collect EMI</button>
// )}
