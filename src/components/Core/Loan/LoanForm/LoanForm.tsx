"use client";
import {
  useCreateLoanMutation,
  useLoanQuery,
  useUpdateLoanMutation,
} from "@/api";
import {
  AppButton,
  AppToast,
  DateInput,
  FormSkeleton,
  SelectInput,
  TextInput,
} from "@/components/Common";
import { loanStatusList } from "@/constants";
import { useInfiniteSelectService, usePageBreadcrumbs } from "@/hooks";
import { LoanFormValues, LoanPayload, LoanRow } from "@/types";
import { handleNumericKeyDown, resolveNumericId } from "@/utils";
import { Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect, useMemo } from "react";

const toFormValues = (loan?: LoanRow | null): LoanFormValues => ({
  customerId: loan?.customerId ?? null,
  collectorId: loan?.collectorId ?? null,
  loanAmount: loan?.loanAmount?.toString() ?? "",
  interestRate: loan?.interestRate?.toString() ?? "",
  tenureMonths: loan?.tenureMonths?.toString() ?? "",
  processingFee: loan?.processingFee?.toString() ?? "",
  disbursedAmount: loan?.disbursedAmount?.toString() ?? "",
  startDate: loan?.startDate ? dayjs(loan.startDate) : null,
  endDate: loan?.endDate ? dayjs(loan.endDate) : null,
  status: loan?.status ?? "pending",
  notes: loan?.notes ?? "",
  rejectionReason: loan?.rejectionReason ?? "",
});

const toApiPayload = (values: LoanFormValues): LoanPayload => ({
  customerId: values.customerId,
  collectorId: values.collectorId,
  loanAmount: Number(values.loanAmount),
  interestRate: Number(values.interestRate),
  tenureMonths: Number(values.tenureMonths),
  processingFee: Number(values.processingFee),
  disbursedAmount: Number(values.disbursedAmount),
  startDate: values.startDate?.format("YYYY-MM-DD") ?? null,
  status: values.status,
  notes: values.notes?.trim() || "",
  rejectionReason: values.rejectionReason?.trim() || "",
});

interface LoanFormProps {
  breadcrumbs?: string[];
}

export const LoanForm: FC<LoanFormProps> = ({ breadcrumbs }) => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [form] = Form.useForm();

  const id: string = params?.id;
  const numericId = useMemo(() => resolveNumericId(id), [id]);

  const isEdit: boolean = !!numericId;

  const { customers, collectors } = useInfiniteSelectService();
  const { data, isLoading } = useLoanQuery(numericId!);
  const { mutateAsync: createLoan, isPending: isCreating } =
    useCreateLoanMutation();
  const { mutateAsync: updateLoan, isPending: isUpdating } =
    useUpdateLoanMutation();

  const isSubmitting: boolean = isCreating || isUpdating;

  const title: string | number = isEdit ? data?.loanNumber || "" : "Add Loan";
  usePageBreadcrumbs(title, breadcrumbs, "Loans");

  useEffect(() => {
    if (data) {
      form.setFieldsValue(toFormValues(data));
    }
  }, [data, form]);

  const handleSubmit = async (values: LoanFormValues) => {
    const payload = toApiPayload(values);

    try {
      if (isEdit && data?.id) {
        const response = await updateLoan({
          id: data.id,
          payload,
        });

        if (response && response.status === 200) {
          AppToast.success(response.data?.message ?? "Loan updated");
        }
      } else {
        const { disbursedAmount, rejectionReason, ...createPayload } = payload;
        const response = await createLoan(createPayload);
        if (response && response.status === 201) {
          AppToast.success(response.data?.message ?? "Loan created");
        }
      }

      router.replace("/loans");
    } catch (error: any) {
      AppToast.error(error?.response?.data?.message ?? "Failed to save loan");
    }
  };

  if (isEdit && isLoading) {
    return <FormSkeleton fields={8} />;
  }

  return (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-6">
        {isEdit ? "Update Loan" : "Create Loan"}
      </h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={toFormValues(data)}
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
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
            <SelectInput
              name="collectorId"
              label="Collector"
              required
              requiredMsg="Collector is required"
              placeholder="Select collector"
              options={collectors.options || []}
              disabled={isEdit}
              searchable
              onSearch={collectors.handleSearch}
              onLoadMore={collectors.loadMore}
              loading={collectors.isFetchingMore}
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="loanAmount"
              label="Amount"
              required
              requiredMsg="Amount is required"
              placeholder="Enter amount"
              onKeyDown={(e) => handleNumericKeyDown(e)}
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="interestRate"
              label="Interest Rate (%)"
              required
              requiredMsg="Interest rate is required"
              placeholder="Enter interest rate"
              onKeyDown={(e) => handleNumericKeyDown(e)}
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="tenureMonths"
              label="Tenure months"
              required
              requiredMsg="Tenure months is required"
              placeholder="Enter tenure months"
              onKeyDown={(e) => handleNumericKeyDown(e)}
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="processingFee"
              label="Processing fee"
              required
              requiredMsg="Processing fee is required"
              placeholder="Enter processing fee"
              onKeyDown={(e) => handleNumericKeyDown(e)}
            />
          </Col>
          <Col xs={24} sm={12}>
            <DateInput
              name="startDate"
              label="Start date"
              placeholder="Select start date"
              required
              requiredMsg="Start date is required"
            />
          </Col>
          {/* <Col xs={24} sm={12}>
            <DateInput
              name="endDate"
              label="End date"
              placeholder="Select end date"
              required
              requiredMsg="End date is required"
            />
          </Col> */}
          {isEdit && (
            <Col xs={24} sm={12}>
              <TextInput
                name="disbursedAmount"
                label="Disbursed amount"
                placeholder="Enter disbursed amount"
                onKeyDown={(e) => handleNumericKeyDown(e)}
              />
            </Col>
          )}
          {isEdit && (
            <Col xs={24} sm={12}>
              <SelectInput
                name="status"
                label="Status"
                placeholder="Select status"
                options={loanStatusList || []}
              />
            </Col>
          )}
          <Col xs={24} sm={12}>
            <TextInput
              name="notes"
              label="Notes"
              isTextarea={true}
              max={1000}
              maxMsg="Notes cannot exceed 1000 characters"
              placeholder="Enter notes"
            />
          </Col>
          {isEdit && (
            <Col xs={24} sm={12}>
              <TextInput
                name="rejectionReason"
                label="Rejection reason"
                isTextarea={true}
                max={1000}
                maxMsg="Rejection reason cannot exceed 1000 characters"
                placeholder="Enter rejection reason"
              />
            </Col>
          )}
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
};
