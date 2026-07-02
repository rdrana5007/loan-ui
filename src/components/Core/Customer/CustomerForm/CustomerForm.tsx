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
  RadioInput,
  SelectInput,
  TextInput,
  UploadInput,
} from "@/components/Common";
import {
  customerGenderOptions,
  customerVerificationStatusList,
} from "@/constants";
import { usePageBreadcrumbs } from "@/hooks";
import {
  CustomerFormValues,
  CustomergGender,
  CustomerRow,
  fileImageData,
} from "@/types";
import { handleNumericKeyDown, resolveNumericId } from "@/utils";
import { Col, Divider, Form, Row } from "antd";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect, useMemo } from "react";

const url = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const fileFields: Record<string, string> = {
  profileImage: "profile",
  aadhaarFile: "aadhaar",
  panFile: "pan",
};

const getImagePath = (path: string) => {
  return new URL(path, url).pathname.split("/").pop() || "";
};

const createUploadFile = (path?: string): fileImageData[] =>
  path
    ? [
        {
          uid: "-1",
          name: getImagePath(path),
          status: "done" as const,
          url: `${url}${path}`,
        },
      ]
    : [];

const toFormValues = (customer?: CustomerRow | null): CustomerFormValues => ({
  firstName: customer?.firstName ?? "",
  lastName: customer?.lastName ?? "",
  email: customer?.email ?? "",
  phone: customer?.phone ?? "",
  isActive: customer?.isActive ?? false,
  gender: customer?.gender as CustomergGender,
  address: customer?.address ?? "",
  city: customer?.city ?? "",
  state: customer?.state ?? "",
  pincode: customer?.pincode ?? "",
  profileImage: createUploadFile(customer?.profileImage),
  aadhaarNumber: customer?.customer_documents?.aadhaarNumber ?? "",
  panNumber: customer?.customer_documents?.panNumber ?? "",
  verificationStatus:
    customer?.customer_documents?.verificationStatus ?? "pending",
  remarks: customer?.customer_documents?.remarks ?? "",
  aadhaarFile: createUploadFile(customer?.customer_documents?.aadhaarFile),
  panFile: createUploadFile(customer?.customer_documents?.panFile),
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
  profileImage: values.profileImage,
  aadhaarNumber: values.aadhaarNumber.trim(),
  panNumber: values.panNumber.trim(),
  verificationStatus: values.verificationStatus,
  remarks: values.remarks.trim() || "",
  aadhaarFile: values.aadhaarFile,
  panFile: values.panFile,
});

const buildCustomerFormData = (values: CustomerFormValues): FormData => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (fileFields[key]) {
      const file = (value as any)?.[0]?.originFileObj;

      if (file) {
        formData.append(fileFields[key], file);
      }
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

interface CustomerFormProps {
  breadcrumbs?: string[];
}

export const CustomerForm: FC<CustomerFormProps> = ({ breadcrumbs }) => {
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

  const title: string = isEdit ? data?.customerCode || "" : "Add Customer";
  usePageBreadcrumbs(title, breadcrumbs, "Customers");

  useEffect(() => {
    if (data) {
      form.setFieldsValue(toFormValues(data));
    }
  }, [data, form]);

  const handleSubmit = async (values: CustomerFormValues) => {
    const payload = toApiPayload(values);
    try {
      const formData = buildCustomerFormData(payload);

      if (isEdit && data?.id) {
        const response = await updateCustomer({
          id: data.id,
          payload: formData,
        });

        if (response && response.status === 200) {
          AppToast.success(response.data?.message ?? "Customer updated");
        }
      } else {
        const response = await createCustomer(formData);
        if (response && response.status === 201) {
          AppToast.success(response.data?.message ?? "Customer created");
        }
      }

      router.replace("/customers");
    } catch (error: any) {
      AppToast.error(
        error?.response?.data?.message ?? "Failed to save customer",
      );
    }
  };

  if (isEdit && isLoading) {
    return <FormSkeleton fields={17} />;
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
          <Col span={24}>
            <Divider titlePlacement="start">
              <span className="font-semibold text-primary">
                Personal Details
              </span>
            </Divider>
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="firstName"
              label="First name"
              required={true}
              requiredMsg="First name is required"
              placeholder="Enter first name"
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="lastName"
              label="Last name"
              required={true}
              requiredMsg="Last name is required"
              placeholder="Enter last name"
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
              onKeyDown={(e) => handleNumericKeyDown(e)}
            />
          </Col>
          <Col xs={24} sm={12}>
            <RadioInput
              name="gender"
              label="Gender"
              required={true}
              requiredMsg="Gender is required"
              options={customerGenderOptions}
            />
          </Col>
          <Col xs={24} sm={12}>
            <UploadInput name="profileImage" label="Profile" isEdit={isEdit} />
          </Col>
          <Col span={24}>
            <Divider titlePlacement="start">
              <span className="font-semibold text-primary">
                Address Details
              </span>
            </Divider>
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="address"
              label="Address"
              isTextarea={true}
              required={true}
              max={255}
              requiredMsg="Address is required"
              maxMsg="Address cannot exceed 255 characters"
              placeholder="Enter address"
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="city"
              label="City"
              required={true}
              requiredMsg="City is required"
              placeholder="Enter city"
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="state"
              label="State"
              required={true}
              requiredMsg="State is required"
              placeholder="Enter state"
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="pincode"
              label="Pincode"
              required={true}
              pattern={/^[0-9]{4,10}$/}
              requiredMsg="Pincode is required"
              patternMsg="Pincode must be between 4 and 10 digits."
              placeholder="Enter pincode"
              onKeyDown={(e) => handleNumericKeyDown(e)}
            />
          </Col>
          <Col span={24}>
            <Divider titlePlacement="start">
              <span className="font-semibold text-primary">
                Documents & Verification
              </span>
            </Divider>
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="aadhaarNumber"
              label="Aadhaar"
              required={true}
              pattern={/^[0-9]{12}$/}
              requiredMsg="Aadhaar number is required"
              patternMsg="Aadhaar number must be exactly 12 digits."
              placeholder="Enter aadhaar number"
              onKeyDown={(e) => handleNumericKeyDown(e)}
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="panNumber"
              label="PAN"
              required={true}
              pattern={/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/}
              requiredMsg="Pan number is required"
              patternMsg="Please enter a valid PAN number."
              placeholder="Enter pan number"
            />
          </Col>
          <Col xs={24} sm={12}>
            <UploadInput name="aadhaarFile" label="Aadhaar file" isEdit={isEdit} />
          </Col>
          <Col xs={24} sm={12}>
            <UploadInput name="panFile" label="Pan file" isEdit={isEdit} />
          </Col>
          <Col xs={24} sm={12}>
            <SelectInput
              name="verificationStatus"
              label="Verification Status"
              placeholder="Select verification status"
              options={customerVerificationStatusList || []}
            />
          </Col>
          {isEdit && (
            <Col xs={24} sm={12}>
              <AppSwitch name="isActive" label="Status" />
            </Col>
          )}
          <Col xs={24} sm={12}>
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
