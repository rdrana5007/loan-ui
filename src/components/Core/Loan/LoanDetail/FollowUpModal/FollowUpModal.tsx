"use client";
import { useCreateEmiCollectionMutation, useEmiSchedulingQuery } from "@/api";
import {
  AppButton,
  AppToast,
  SelectInput,
  TextInput,
} from "@/components/Common";
import { emiPaymentMethodList } from "@/constants";
import {
  EmiCollectionFormValues,
  EmiSchedulingRow,
  LoanEmiApiRecord,
} from "@/types";
import { handleNumericKeyDown } from "@/utils";
import { Col, Form, Row } from "antd";
import { FC } from "react";

type RefetchType = ReturnType<typeof useEmiSchedulingQuery>["refetch"];

interface FollowUpModalProps {
  data?: EmiSchedulingRow | null;
  loanData?: LoanEmiApiRecord | null;
  refetch: RefetchType;
  onClose: () => void;
}

const toApiPayload = (
  values: EmiCollectionFormValues,
  data?: EmiSchedulingRow | null,
  loanData?: LoanEmiApiRecord | null,
): EmiCollectionFormValues => ({
  emiScheduleId: data?.id,
  loanId: data?.loanId,
  customerId: loanData?.customerId,
  collectedAmount: Number(values.collectedAmount),
  paymentMethod: values.paymentMethod,
  transactionReference: values.transactionReference.trim(),
  remarks: values.remarks?.trim() || "",
});

export const FollowUpModal: FC<FollowUpModalProps> = ({
  data,
  loanData,
  refetch,
  onClose,
}) => {
  const [form] = Form.useForm();

  const { mutateAsync: createEmiCollection, isPending: isCreating } =
    useCreateEmiCollectionMutation();

  const handleSubmit = async (values: EmiCollectionFormValues) => {
    const payload = toApiPayload(values, data, loanData);

    try {
      const response = await createEmiCollection(payload);
      if (response && response.status === 201) {
        AppToast.success(response.data?.message ?? "EMI collected");
        await refetch();
        onClose();
      }
    } catch (error: any) {
      AppToast.error(
        error?.response?.data?.message ?? "Failed to save emi collection",
      );
    }
  };

  return (
    <div className="w-full mt-6">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <TextInput
              name="collectedAmount"
              label="Amount"
              required
              requiredMsg="Amount is required"
              placeholder="Enter amount"
              onKeyDown={(e) => handleNumericKeyDown(e)}
            />
          </Col>
          <Col xs={24}>
            <SelectInput
              name="paymentMethod"
              label="Payment method"
              required={true}
              requiredMsg="Payment method is required"
              placeholder="Select payment method"
              options={emiPaymentMethodList || []}
            />
          </Col>
          <Col xs={24}>
            <TextInput
              name="transactionReference"
              label="Transaction reference"
              required={true}
              requiredMsg="Transaction reference is required"
              placeholder="Enter transaction reference"
            />
          </Col>
          <Col xs={24}>
            <TextInput
              name="remarks"
              label="Remarks"
              isTextarea={true}
              max={1000}
              maxMsg="Remarks cannot exceed 1000 characters"
              placeholder="Enter remarks"
            />
          </Col>
        </Row>
        <Row gutter={[12, 12]} justify="end" className="mt-4">
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
