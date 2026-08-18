"use client";
import { useUpdateUserMutation } from "@/api";
import {
  AppButton,
  AppToast,
  FormSkeleton,
  SelectInput,
  TextInput,
} from "@/components/Common";
import { allRoleList } from "@/constants";
import { useProfile } from "@/hooks";
import { ProfileResponse, UserFormValues, UserProfile } from "@/types";
import { handleNumericKeyDown } from "@/utils";
import { Col, Form, Row } from "antd";
import { useEffect } from "react";

const toFormValues = (
  user?: ProfileResponse | UserProfile | null,
): UserFormValues => ({
  userName: user?.userName ?? "",
  fullName: user?.fullName ?? "",
  email: user?.email ?? "",
  phone: user?.phone ?? "",
  roleId: user?.roleId,
});

const toApiPayload = (values: UserFormValues) => ({
  userName: values.userName.trim(),
  fullName: values.fullName.trim(),
  phone: values.phone.trim(),
});

export const Profile = () => {
  const [form] = Form.useForm();
  const { data, isPending } = useProfile();
  const { mutateAsync: updateUser, isPending: isUpdating } =
    useUpdateUserMutation();

  useEffect(() => {
    if (!isPending && data) {
      form.setFieldsValue(toFormValues(data));
    }
  }, [data, isPending, form]);

  const handleSubmit = async (values: UserFormValues) => {
    if (!data?.id) return;

    const payload = toApiPayload(values);

    try {
      const response = await updateUser({ id: data.id, payload });
      if (response && response.status === 200) {
        AppToast.success("Profile updated successfully");
      }
    } catch (error: any) {
      AppToast.error(
        error?.response?.data?.message ?? "Failed to save profile",
      );
    }
  };

  if (isPending) {
    return <FormSkeleton fields={5} />;
  }

  return (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-6">My Account</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={toFormValues(data)}
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <TextInput
              name="userName"
              label="User name"
              required={true}
              requiredMsg="User name is required"
              placeholder="Enter user name"
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="fullName"
              label="Full name"
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
              disabled
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
            <SelectInput
              name="roleId"
              label="Role"
              required={true}
              requiredMsg="Role is required"
              placeholder="Select role"
              options={allRoleList || []}
              disabled
            />
          </Col>
        </Row>
        <Row gutter={[12, 12]} justify="end" className="mt-6">
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
              disabled={isUpdating}
              className="w-full! h-10! md:h-8 lg:h-10"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
