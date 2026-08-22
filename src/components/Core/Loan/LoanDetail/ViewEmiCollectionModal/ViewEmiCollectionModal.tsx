"use client";
import {
  AppButton,
  AppDescriptions,
  AppTable,
  AppTag,
} from "@/components/Common";
import { emiPaymentMethodList } from "@/constants";
import {
  EmiCollectionItemRow,
  EmiCollectionRow,
  EmiPaymentMethod,
} from "@/types";
import { formatters } from "@/utils";
import { Col, Row } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC, useMemo } from "react";

interface ViewEmiCollectionModalProps {
  data?: EmiCollectionRow | null;
  onClose: () => void;
}

const renderPaymentMethodTag = (val?: EmiPaymentMethod) => (
  <AppTag value={val} options={emiPaymentMethodList} variant="outlined" />
);

export const ViewEmiCollectionModal: FC<ViewEmiCollectionModalProps> = ({
  data,
  onClose,
}) => {
  if (!data) return null;

  const emiCollectionItemData = data?.emi_collection_items;

  const {
    id,
    totalAmount,
    paymentMethod,
    transactionReference,
    remarks,
    createdAt,
  } = data;

  const items = useMemo(
    () => [
      {
        key: "id",
        label: "Receipt No.",
        children: formatters.receiptNo(id),
      },
      {
        key: "totalAmount",
        label: "Collected amount",
        children: formatters.currency(totalAmount),
      },
      {
        key: "paymentMethod",
        label: "Payment method",
        children: renderPaymentMethodTag(paymentMethod),
      },
      {
        key: "createdAt",
        label: "Created date",
        children: formatters.dateTime(createdAt),
      },
      {
        key: "transactionReference",
        label: "Transaction reference",
        children: formatters.value(transactionReference),
        span: { xs: 1, sm: 1, md: 2 },
      },
      {
        key: "remarks",
        label: "Remarks",
        children: formatters.value(remarks),
        span: { xs: 1, sm: 1, md: 2 },
      },
    ],
    [data],
  );

  const columns = useMemo<ColumnsType<EmiCollectionItemRow>>(
    () => [
      {
        title: "Installment",
        dataIndex: ["emi_schedules", "installmentNo"],
        key: "installmentNo",
        width: 50,
        render: formatters.installmentNo,
      },
      {
        title: "Due Date",
        dataIndex: ["emi_schedules", "dueDate"],
        key: "dueDate",
        width: 120,
        render: formatters.date,
      },
      {
        title: "EMI Amount",
        dataIndex: ["emi_schedules", "emiScheduleAmount"],
        key: "emiScheduleAmount",
        width: 120,
        render: formatters.currency,
      },
      {
        title: "Paid in This Collection",
        dataIndex: "amount",
        key: "amount",
        width: 200,
        render: formatters.currency,
      },
    ],
    [],
  );

  return (
    <div className="mt-6">
      <AppDescriptions items={items} />
      <div className="mt-6 mb-2">
        <h3 className="text-base font-semibold">EMI Collection Items</h3>
      </div>
      <AppTable
        rowKey={(record: any) => record.id}
        tableColumns={columns}
        tableData={emiCollectionItemData}
        pagination={false}
      />
      <Row justify="end" className="mt-6">
        <Col>
          <AppButton
            block
            label="Close"
            onClick={onClose}
            className="w-full! h-9! md:h-8 lg:h-9"
          />
        </Col>
      </Row>
    </div>
  );
};
