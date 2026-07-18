"use client";
import { useUpdateEmiFollowUpMutation } from "@/api";
import {
  AppButton,
  AppToast,
  DateInput,
  SelectInput,
  TextInput,
} from "@/components/Common";
import { followUpCommunicationTypeList, followUpStatusList } from "@/constants";
import {
  CommunicationType,
  EmiFollowUpFormValues,
  EmiFollowUpPayload,
  EmiFollowUpRow,
  EmiFollowUpStatus,
} from "@/types";
import { Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { FC, useEffect } from "react";

interface UpdateFollowUpModalProps {
  data?: EmiFollowUpRow | null;
  onClose: () => void;
}

const toFormValues = (
  followUp?: EmiFollowUpRow | null,
): EmiFollowUpFormValues => ({
  communicationType: followUp?.communicationType as CommunicationType,
  status: followUp?.status as EmiFollowUpStatus,
  remarks: followUp?.remarks ?? "",
  followUpDate: followUp?.followUpDate ? dayjs(followUp.followUpDate) : null,
  nextFollowupDate: followUp?.nextFollowupDate
    ? dayjs(followUp.nextFollowupDate)
    : null,
});

const toApiPayload = (values: EmiFollowUpFormValues): EmiFollowUpPayload => ({
  communicationType: values.communicationType,
  status: values.status,
  remarks: values.remarks?.trim() ?? "",
  followUpDate: values.followUpDate?.format("YYYY-MM-DD") ?? null,
  nextFollowupDate: values.nextFollowupDate?.format("YYYY-MM-DD") ?? null,
});

export const UpdateFollowUpModal: FC<UpdateFollowUpModalProps> = ({
  data,
  onClose,
}) => {
  const [form] = Form.useForm();

  const { mutateAsync: updateEmiFollowUp, isPending: isUpdating } =
    useUpdateEmiFollowUpMutation();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(toFormValues(data));
    }
  }, [data, form]);

  const handleSubmit = async (values: EmiFollowUpFormValues) => {
    const payload = toApiPayload(values);

    if (!data) return;

    try {
      const response = await updateEmiFollowUp({
        id: data.id,
        payload,
      });
      if (response && response.status === 200) {
        AppToast.success(response.data?.message ?? "EMI follow-up updated");
        onClose();
      }
    } catch (error: any) {
      AppToast.error(
        error?.response?.data?.message ?? "Failed to save EMI collection",
      );
    }
  };

  return (
    <div className="w-full mt-6">
      <Form
        form={form}
        layout="vertical"
        initialValues={toFormValues(data)}
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <SelectInput
              name="communicationType"
              label="Communication type"
              required={true}
              requiredMsg="Communication type is required"
              placeholder="Select communication type"
              options={followUpCommunicationTypeList || []}
            />
          </Col>
          <Col xs={24}>
            <SelectInput
              name="status"
              label="Status"
              required={true}
              requiredMsg="Status is required"
              placeholder="Select status"
              options={followUpStatusList || []}
            />
          </Col>
          <Col xs={24}>
            <TextInput
              name="remarks"
              label="Remarks"
              isTextarea={true}
              required={true}
              max={1000}
              requiredMsg="Remarks is required"
              maxMsg="Remarks cannot exceed 1000 characters"
              placeholder="Enter remarks"
            />
          </Col>
          <Col xs={24}>
            <DateInput
              name="followUpDate"
              label="Follow-up date"
              placeholder="Select follow-up date"
              required
              requiredMsg="Follow-up date is required"
            />
          </Col>
          <Col xs={24}>
            <DateInput
              name="nextFollowupDate"
              label="Next follow-up date"
              placeholder="Select next follow-up date"
            />
          </Col>
        </Row>
        <Row gutter={[12, 12]} justify="end" className="mt-6">
          <Col>
            <AppButton
              block
              label="Close"
              onClick={onClose}
              className="w-full! h-9! md:h-8 lg:h-9"
            />
          </Col>
          <Col>
            <AppButton
              block
              type="primary"
              htmlType="submit"
              label="Save"
              disabled={isUpdating}
              className="w-full! h-9! md:h-8 lg:h-9"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
