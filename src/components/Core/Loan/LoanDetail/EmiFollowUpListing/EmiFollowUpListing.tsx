"use client";
import {
  AppButton,
  AppModal,
  AppTable,
  AppTag,
  FilterInput,
} from "@/components/Common";
import {
  followUpCommunicationTypeList,
  followUpStatus,
  followUpStatusList,
} from "@/constants";
import { useEmiFollowUpListing, useResponsive } from "@/hooks";
import { CommunicationType, EmiFollowUpRow, EmiFollowUpStatus } from "@/types";
import { createOptionMap, formatters, resolveNumericId } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { useParams } from "next/navigation";
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ViewEmiFollowUpModal } from "../ViewEmiFollowUpModal";
import { UpdateFollowUpModal } from "../UpdateFollowUpModal";

type FollowUpModalType = "view" | "update";

type ModalState = {
  open: boolean;
  type: FollowUpModalType | null;
  row?: EmiFollowUpRow | null;
};

type ModalContentConfig = {
  component: ReactNode;
  width?: number | string;
  style?: CSSProperties;
};

const MODAL_TITLES: Record<FollowUpModalType, string> = {
  view: "Follow-up Details",
  update: "Update Follow-up",
};

const COMMUNICATION_TYPE_MAP = createOptionMap(followUpCommunicationTypeList);

const renderCommunicationType = (value?: CommunicationType) =>
  value ? (COMMUNICATION_TYPE_MAP[value] ?? "--") : "--";

const renderFollowUpStatusTag = (val?: EmiFollowUpStatus) => (
  <AppTag value={val} options={followUpStatusList} />
);

export const EmiFollowUpListing = () => {
  const params = useParams<{ id: string }>();
  const { isMobile } = useResponsive();

  const id: string = params?.id;
  const loanId = useMemo(() => resolveNumericId(id), [id]);

  const {
    data,
    isLoading,
    pagination,
    statusFilter,
    handleFilterChange,
    handleTableChange,
  } = useEmiFollowUpListing({ loanId });

  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    type: null,
    row: null,
  });

  const closeModal = useCallback(() => {
    setModalState({ open: false, type: null, row: null });
  }, []);

  const openModal = useCallback(
    (type: FollowUpModalType, row?: EmiFollowUpRow) => {
      setModalState({ open: true, type, row });
    },
    [],
  );

  const modalTitle = modalState.type ? MODAL_TITLES[modalState.type] : "";

  const modalContentConfig: Record<FollowUpModalType, ModalContentConfig> = {
    view: {
      component: (
        <ViewEmiFollowUpModal data={modalState.row} onClose={closeModal} />
      ),
      width: 800,
      style: { maxWidth: "95vw" },
    },
    update: {
      component: (
        <UpdateFollowUpModal data={modalState.row} onClose={closeModal} />
      ),
    },
  };

  const config = modalState.type ? modalContentConfig[modalState.type] : null;

  const renderActions = useCallback(
    (_: unknown, row: EmiFollowUpRow) => (
      <div className="flex flex-wrap items-center gap-2">
        <AppButton
          size="small"
          label="View"
          className="rounded-md bg-blue-100! text-blue-700! hover:bg-blue-200! border-0!"
          onClick={() => openModal("view", row)}
        />
        {row?.status === "pending" && (
          <AppButton
            size="small"
            label="Update"
            className="rounded-md bg-amber-100! text-amber-700! hover:bg-amber-200! border-0!"
            onClick={() => openModal("update", row)}
          />
        )}
      </div>
    ),
    [openModal],
  );

  const columns = useMemo<ColumnsType<EmiFollowUpRow>>(
    () => [
      {
        title: "Communication Type",
        dataIndex: "communicationType",
        key: "communicationType",
        fixed: !isMobile ? "left" : undefined,
        width: 180,
        render: renderCommunicationType,
      },
      {
        title: "Follow-up Date",
        dataIndex: "followUpDate",
        key: "followUpDate",
        width: 180,
        render: formatters.date,
      },
      {
        title: "Next Follow-up Date",
        dataIndex: "nextFollowupDate",
        key: "nextFollowupDate",
        width: 180,
        render: formatters.date,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 120,
        render: renderFollowUpStatusTag,
      },
      {
        title: "Created Date",
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
        width: 150,
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
            EMI Follow-up Listing
            {/* Listing */}
          </h2>
          <div className="w-full sm:w-64">
            <FilterInput
              placeholder="All Status"
              filterKey="status"
              value={statusFilter}
              options={followUpStatus}
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
