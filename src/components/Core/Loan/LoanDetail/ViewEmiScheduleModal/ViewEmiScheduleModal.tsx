"use client";
import { AppButton, AppDescriptions, AppTag } from "@/components/Common";
import { emiScheduleStatusList } from "@/constants";
import { EmiScheduleRow, EmiScheduleStatus } from "@/types";
import { formatters } from "@/utils";
import { Col, Row } from "antd";
import { FC, useMemo } from "react";

interface ViewEmiScheduleModalProps {
  data?: EmiScheduleRow | null;
  onClose: () => void;
}

const renderStatusTag = (val?: EmiScheduleStatus) => (
  <AppTag value={val} options={emiScheduleStatusList} />
);

export const ViewEmiScheduleModal: FC<ViewEmiScheduleModalProps> = ({
  data,
  onClose,
}) => {
  if (!data) return null;

  const {
    installmentNo,
    emiScheduleAmount,
    principalAmount,
    interestAmount,
    paidAmount,
    balanceAmount,
    status,
    dueDate,
    paidDate,
  } = data;

  const items = useMemo(
    () => [
      {
        key: "installmentNo",
        label: "Installment",
        children: formatters.installmentNo(installmentNo),
      },
      {
        key: "emiScheduleAmount",
        label: "EMI amount",
        children: formatters.currency(emiScheduleAmount),
      },
      {
        key: "principalAmount",
        label: "Principal amount",
        children: formatters.currency(principalAmount),
      },
      {
        key: "interestAmount",
        label: "Interest amount",
        children: formatters.currency(interestAmount),
      },
      {
        key: "paidAmount",
        label: "Paid amount",
        children: formatters.currency(paidAmount),
      },
      {
        key: "balanceAmount",
        label: "Balance amount",
        children: formatters.currency(balanceAmount),
      },
      {
        key: "dueDate",
        label: "Due date",
        children: formatters.date(dueDate),
      },
      {
        key: "paidDate",
        label: "Paid date",
        children: formatters.date(paidDate ?? undefined),
      },
      {
        key: "status",
        label: "Status",
        children: renderStatusTag(status),
      },
    ],
    [data],
  );

  return (
    <div className="mt-6">
      <AppDescriptions items={items} />
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
