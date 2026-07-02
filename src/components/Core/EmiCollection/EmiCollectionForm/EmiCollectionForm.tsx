"use client";

import { useCreateEmiCollectionMutation } from "@/api";
import {
  AppButton,
  AppToast,
  SelectInput,
  TextInput,
} from "@/components/Common";
import { paymentMethodList } from "@/constants";
import { useInfiniteSelectService, usePageBreadcrumbs } from "@/hooks";
import { handleNumericKeyDown, resolveNumericId } from "@/utils";
import { Col, Form, Row } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

const toApiPayload = (values: any) => ({
  emiScheduleId: Number(values.emiScheduleId),
  customerId: Number(values.customerId),
  collectedAmount: Number(values.collectedAmount),
  paymentMethod: values.paymentMethod,
  transactionReference: values.transactionReference?.trim(),
  remarks: values.remarks?.trim(),
});

interface UserFormProps {
  breadcrumbs?: string[];
}
export default function EmiCollectionForm({ breadcrumbs }: UserFormProps) {
    const params = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const router = useRouter();
  const { customers } = useInfiniteSelectService();
    const id: string = params?.id;
    const numericId = useMemo(() => resolveNumericId(id), [id]);
  
  const isEdit: boolean = !!numericId;

  usePageBreadcrumbs("Add EMI Collection", breadcrumbs, "EMI Collections");

  const {
    mutateAsync: createEmiCollection,
    isPending: isSubmitting,
  } = useCreateEmiCollectionMutation();

  const handleSubmit = async (values: any) => {
    try {
      const payload = toApiPayload(values);

      const response = await createEmiCollection(payload as any);

      if (response?.status === 201 || response?.status === 200) {
        AppToast.success(
          response?.data?.message ?? "EMI Collection created successfully"
        );

        router.replace("/emi-collections");
      }
    } catch (error: any) {
      AppToast.error(
        error?.response?.data?.message ??
          "Failed to create EMI Collection"
      );
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-6">
        Create EMI Collection
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <TextInput
              name="emiScheduleId"
              label="EMI Schedule ID"
              required={true}
              requiredMsg="EMI Schedule ID is required"
              placeholder="Enter EMI Schedule ID"
              onKeyDown={(e) => handleNumericKeyDown(e)}
            />
          </Col>

          <Col xs={24} sm={12}>
           <SelectInput
              name="customerId"
              label="Customer"
              required
              requiredMsg="Customer is required"
              placeholder="Select customer"
              options={customers.options || []}
              disabled={isEdit}
              searchable
              onSearch={customers.handleSearch}
              onLoadMore={customers.loadMore}
              loading={customers.isFetchingMore}
            />
          </Col>

          <Col xs={24} sm={12}>
            <TextInput
              name="collectedAmount"
              label="Collected Amount"
              required={true}
              requiredMsg="Collected Amount is required"
              placeholder="Enter Collected Amount"
              onKeyDown={(e) => handleNumericKeyDown(e)}
            />
          </Col>

          <Col xs={24} sm={12}>
            <SelectInput
              name="paymentMethod"
              label="Payment Method"
              required={true}
              requiredMsg="Payment Method is required"
              placeholder="Select Payment Method"
              options={paymentMethodList}
            />
          </Col>

          <Col xs={24} sm={12}>
            <TextInput
              name="transactionReference"
              label="Transaction Reference"
              required={true}
              requiredMsg="Transaction Reference is required"
              placeholder="Enter Transaction Reference"
            />
          </Col>

          <Col xs={24} sm={12}>
            <TextInput
              name="remarks"
              label="Remarks"
              placeholder="Enter Remarks"
            />
          </Col>
        </Row>

        <Row gutter={[12, 12]} justify="end" className="mt-4">
          <Col xs={24} sm={8} md={6} lg={4}>
            <AppButton
              block
              label="Reset"
              onClick={() => form.resetFields()}
              className="w-full! h-10! md:h-8 lg:h-10"
            />
          </Col>

          <Col xs={24} sm={8} md={6} lg={4}>
            <AppButton
              block
              type="primary"
              htmlType="submit"
              label="Save"
              disabled={isSubmitting}
              className="w-full! h-10! md:h-8 lg:h-10"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}