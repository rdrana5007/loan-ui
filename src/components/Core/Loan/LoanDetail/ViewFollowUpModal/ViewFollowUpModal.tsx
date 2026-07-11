"use client";
import { AppButton, AppDescriptions, AppTag } from "@/components/Common";
import { emiPaymentMethodList } from "@/constants";
import { EmiCollectionRow, EmiPaymentMethod } from "@/types";
import { formatters } from "@/utils";
import { Col, Row } from "antd";
import { FC, useMemo } from "react";

interface ViewFollowUpModalProps {
  data?: EmiCollectionRow | null;
  onClose: () => void;
}

const renderPaymentMethodTag = (val?: EmiPaymentMethod) => (
  <AppTag value={val} options={emiPaymentMethodList} variant="outlined" />
);

export const ViewFollowUpModal: FC<ViewFollowUpModalProps> = ({
  data,
  onClose,
}) => {
  if (!data) return null;

  const {
    id,
    collectedAmount,
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
        key: "collectedAmount",
        label: "Collected amount",
        children: formatters.currency(collectedAmount),
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
