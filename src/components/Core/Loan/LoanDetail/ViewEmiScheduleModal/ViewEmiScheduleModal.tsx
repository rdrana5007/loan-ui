"use client";
import { AppButton, AppTag } from "@/components/Common";
import { emiSchedulingStatusList } from "@/constants";
import { EmiSchedulingRow, EmiSchedulingStatus } from "@/types";
import { formatters } from "@/utils";
import { Col, Descriptions, Row } from "antd";
import { FC } from "react";

interface ViewEmiScheduleModalProps {
  data?: EmiSchedulingRow | null;
  onClose: () => void;
}

const renderVerificationTag = (val?: EmiSchedulingStatus) => (
  <AppTag value={val} options={emiSchedulingStatusList} />
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

  const items = [
    {
      key: "installmentNo",
      label: "Installment no.",
      children: formatters.value(installmentNo),
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
      children: renderVerificationTag(status),
    },
  ];

  return (
    <>
      <div className="mt-6">
        <Descriptions
          bordered
          size="middle"
          column={{ xs: 1, sm: 1, md: 2 }}
          items={items}
          className="overflow-hidden"
          styles={{
            label: {
              width: 220,
              fontWeight: 600,
            },
            content: {
              width: 320,
            },
          }}
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
    </>
  );
};
