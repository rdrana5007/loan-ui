"use client";
import {
  useCreateCustomerMutation,
  useCustomerQuery,
  useUpdateCustomerMutation,
} from "@/api";
import {
  AppButton,
  AppSwitch,
  AppToast,
  FormSkeleton,
  SelectInput,
  TextInput,
} from "@/components/Common";
import { roleList } from "@/constants";
import { usePageBreadcrumbs } from "@/hooks";
import { CustomerFormValues, CustomerRow } from "@/types";
import { resolveNumericId } from "@/utils";
import { Col, Form, Row } from "antd";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect, useMemo } from "react";

interface CustomerFormProps {
  title: string;
  breadcrumbs?: string[];
}

const toFormValues = (customer?: CustomerRow | null): CustomerFormValues => ({
  firstName: customer?.firstName ?? "",
  lastName: customer?.lastName ?? "",
  email: customer?.email ?? "",
  phone: customer?.phone ?? "",
  isActive: customer?.isActive ?? false,
  gender: customer?.gender ?? "male",
  address: customer?.address ?? "",
  city: customer?.city ?? "",
  state: customer?.state ?? "",
  pincode: customer?.pincode ?? "",
  profileImage: customer?.profileImage ?? ""
});

const toApiPayload = (values: CustomerFormValues) => ({
  firstName: values.firstName.trim(),
  lastName: values.lastName.trim(),
  email: values.email.trim(),
  phone: values.phone.trim(),
  isActive: values.isActive,
  gender: values.gender,
  address: values.address.trim(),
  city: values.city.trim(),
  state: values.state.trim(),
  pincode: values.pincode.trim(),
  profileImage: values.profileImage
});

export const CustomerForm: FC<CustomerFormProps> = ({ title, breadcrumbs }) => {
  usePageBreadcrumbs(title, breadcrumbs);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [form] = Form.useForm();

  const id: string = params?.id;
  const numericId = useMemo(() => resolveNumericId(id), [id]);
  const isEdit: boolean = !!numericId;

  const { data, isLoading } = useCustomerQuery(numericId!);
  const { mutateAsync: createCustomer, isPending: isCreating } =
    useCreateCustomerMutation();
  const { mutateAsync: updateCustomer, isPending: isUpdating } =
    useUpdateCustomerMutation();

  const isSubmitting: boolean = isCreating || isUpdating;

  useEffect(() => {
    if (data) {
      form.setFieldsValue(toFormValues(data));
    }
  }, [data, form]);

  const handleSubmit = async (values: CustomerFormValues) => {
    const payload = toApiPayload(values);

    try {
      if (isEdit && data?.id) {
        const { ...updatePayload } = payload;
        const response = await updateCustomer({
          id: data.id,
          payload: updatePayload,
        });
        if (response && response.status === 200) {
          AppToast.success(response.data?.message ?? "Customer updated");
        }
      } else {
        const response = await createCustomer(payload);
        if (response && response.status === 201) {
          AppToast.success(response.data?.message ?? "Customer created");
        }
      }
      router.replace("/customers");
    } catch (error: any) {
      AppToast.error(error?.response?.data?.message ?? "Failed to save customer");
    }
  };

  if (isEdit && isLoading) {
    return <FormSkeleton fields={6} />;
  }

  return (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-6">
        {isEdit ? "Update Customer" : "Create Customer"}
      </h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={toFormValues(data)}
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <TextInput
              name="firstName"
              label="First name"
              required={true}
              requiredMsg="User name is required"
              placeholder="Enter user name"
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="lastName"
              label="Last name"
              required={true}
              requiredMsg="Full name is required"
              placeholder="Enter full name"
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="email"
              label="Email"
              required={true}
              type="email"
              requiredMsg="Email is required"
              typeMsg="Invalid email"
              placeholder="Enter email"
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="phone"
              label="Mobile Number"
              required={true}
              pattern={/^[0-9]{10,15}$/}
              requiredMsg="Mobile Number is required"
              patternMsg="Phone number must be between 10 and 15 digits."
              placeholder="Enter mobile number"
            />
          </Col>
          {isEdit && (
            <Col xs={24} sm={12}>
              <AppSwitch name="isActive" label="Status" />
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