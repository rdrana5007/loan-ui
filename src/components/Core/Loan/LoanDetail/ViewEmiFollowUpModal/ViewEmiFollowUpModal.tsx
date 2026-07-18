"use client";
import { AppButton, AppDescriptions, AppTag } from "@/components/Common";
import { followUpCommunicationTypeList, followUpStatusList } from "@/constants";
import { EmiFollowUpRow, EmiFollowUpStatus } from "@/types";
import { createOptionMap, formatters } from "@/utils";
import { Col, Row } from "antd";
import { FC, useMemo } from "react";

interface ViewEmiFollowUpModalProps {
  data?: EmiFollowUpRow | null;
  onClose: () => void;
}

const COMMUNICATION_TYPE_MAP = createOptionMap(followUpCommunicationTypeList);

const renderFollowUpStatusTag = (val?: EmiFollowUpStatus) => (
  <AppTag value={val} options={followUpStatusList} />
);

export const ViewEmiFollowUpModal: FC<ViewEmiFollowUpModalProps> = ({
  data,
  onClose,
}) => {
  if (!data) return null;

  const {
    communicationType,
    remarks,
    followUpDate,
    nextFollowupDate,
    status,
    createdAt,
  } = data;

  const items = useMemo(
    () => [
      {
        key: "communicationType",
        label: "Communication type",
        children: COMMUNICATION_TYPE_MAP[communicationType] ?? "--",
        span: { xs: 1, sm: 1, md: 2 },
      },
      {
        key: "remarks",
        label: "Remarks",
        children: formatters.value(remarks),
        span: { xs: 1, sm: 1, md: 2 },
      },
      {
        key: "followUpDate",
        label: "Follow-up date",
        children: formatters.date(followUpDate),
      },
      {
        key: "nextFollowupDate",
        label: "Next follow-up date",
        children: formatters.date(nextFollowupDate),
      },
      {
        key: "status",
        label: "Status",
        children: renderFollowUpStatusTag(status),
      },
      {
        key: "createdAt",
        label: "Created date",
        children: formatters.dateTime(createdAt),
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
