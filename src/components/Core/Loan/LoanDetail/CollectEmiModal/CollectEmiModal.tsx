"use client";
import {
  useCreateEmiCollectionMutation,
  useEmiSchedulesByLoanQuery,
} from "@/api";
import {
  AppButton,
  AppToast,
  SelectInput,
  TextInput,
} from "@/components/Common";
import { emiPaymentMethodList } from "@/constants";
import { EmiCollectionFormValues, LoanEmiApiRecord } from "@/types";
import { handleNumericKeyDown } from "@/utils";
import { Col, Form, Row } from "antd";
import { FC } from "react";

type RefetchType = ReturnType<typeof useEmiSchedulesByLoanQuery>["refetch"];

interface CollectEmiModalProps {
  loanData?: LoanEmiApiRecord | null;
  refetch: RefetchType;
  onClose: () => void;
}

const toApiPayload = (
  values: EmiCollectionFormValues,
  loanData?: LoanEmiApiRecord | null,
): EmiCollectionFormValues => ({
  loanId: loanData?.id,
  customerId: loanData?.customerId,
  totalAmount: Number(values.totalAmount),
  paymentMethod: values.paymentMethod,
  transactionReference: values.transactionReference.trim(),
  remarks: values.remarks?.trim() || "",
});

export const CollectEmiModal: FC<CollectEmiModalProps> = ({
  loanData,
  refetch,
  onClose,
}) => {
  const [form] = Form.useForm();

  const { mutateAsync: createEmiCollection, isPending: isCreating } =
    useCreateEmiCollectionMutation();

  const handleSubmit = async (values: EmiCollectionFormValues) => {
    const payload = toApiPayload(values, loanData);

    try {
      const response = await createEmiCollection(payload);
      if (response && response.status === 201) {
        AppToast.success(response.data?.message ?? "EMI collected");
        await refetch();
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
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <TextInput
              name="totalAmount"
              label="Collected amount"
              required
              requiredMsg="Collected amount is required"
              placeholder="Enter collected amount"
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
