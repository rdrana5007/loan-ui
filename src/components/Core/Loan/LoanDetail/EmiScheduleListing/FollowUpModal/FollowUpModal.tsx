"use client";
import {
  useCreateEmiFollowUpMutation,
  useEmiSchedulesByLoanQuery,
} from "@/api";
import {
  AppButton,
  AppToast,
  DateInput,
  SelectInput,
  TextInput,
} from "@/components/Common";
import { followUpCommunicationTypeList } from "@/constants";
import {
  EmiFollowUpFormValues,
  EmiFollowUpPayload,
  LoanEmiApiRecord,
} from "@/types";
import { Col, Form, Row } from "antd";
import { FC } from "react";

type RefetchType = ReturnType<typeof useEmiSchedulesByLoanQuery>["refetch"];

interface FollowUpModalProps {
  emiId?: number;
  loanData?: LoanEmiApiRecord | null;
  refetch: RefetchType;
  onClose: () => void;
}

const toApiPayload = (
  values: EmiFollowUpFormValues,
  emiId?: number,
  loanData?: LoanEmiApiRecord | null,
): EmiFollowUpPayload => ({
  emiScheduleId: emiId,
  loanId: loanData?.id,
  customerId: loanData?.customerId,
  communicationType: values.communicationType,
  followUpDate: values.followUpDate?.format("YYYY-MM-DD") ?? null,
  nextFollowupDate: values.nextFollowupDate?.format("YYYY-MM-DD") ?? null,
  remarks: values.remarks?.trim() ?? "",
});

export const FollowUpModal: FC<FollowUpModalProps> = ({
  emiId,
  loanData,
  refetch,
  onClose,
}) => {
  const [form] = Form.useForm();

  const { mutateAsync: createEmiFollowUp, isPending: isCreating } =
    useCreateEmiFollowUpMutation();

  const handleSubmit = async (values: EmiFollowUpFormValues) => {
    const payload = toApiPayload(values, emiId, loanData);

    try {
      const response = await createEmiFollowUp(payload);
      if (response && response.status === 201) {
        AppToast.success(response.data?.message ?? "EMI follow-up created");
        await refetch();
        onClose();
      }
    } catch (error: any) {
      AppToast.error(
        error?.response?.data?.message ?? "Failed to save EMI follow-up",
      );
    }
  };

  return (
    <div className="w-full mt-6">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
              disabled={isCreating}
              className="w-full! h-9! md:h-8 lg:h-9"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
