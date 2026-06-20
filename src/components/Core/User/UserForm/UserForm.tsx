"use client";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useUserQuery,
} from "@/api";
import {
  AppButton,
  AppSwitch,
  AppToast,
  SelectInput,
  TextInput,
} from "@/components/Common";
import { roleList } from "@/constants";
import { usePageBreadcrumbs } from "@/hooks";
import { UserFormValues, UserRow } from "@/types";
import { resolveNumericJobId } from "@/utils";
import { Col, Form, Row } from "antd";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect, useMemo } from "react";

interface UserFormProps {
  title: string;
  breadcrumbs?: string[];
}

const toFormValues = (user?: UserRow | null): UserFormValues => ({
  userName: user?.userName ?? "",
  fullName: user?.fullName ?? "",
  email: user?.email ?? "",
  phone: user?.phone ?? "",
  roleId: user?.roleId,
  isActive: user?.isActive ?? false,
});

const toApiPayload = (values: UserFormValues) => ({
  userName: values.userName.trim(),
  fullName: values.fullName.trim(),
  email: values.email.trim(),
  phone: values.phone.trim(),
  password: values.password,
  roleId: values.roleId,
  isActive: values.isActive,
});

export const UserForm: FC<UserFormProps> = ({ title, breadcrumbs }) => {
  usePageBreadcrumbs(title, breadcrumbs);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [userForm] = Form.useForm();

  const id: string = params?.id;
  const numericJobId = useMemo(() => resolveNumericJobId(id), [id]);

  const { data } = useUserQuery(numericJobId!);
  const { mutateAsync: createUser, isPending: isCreating } =
    useCreateUserMutation();
  const { mutateAsync: updateUser, isPending: isUpdating } =
    useUpdateUserMutation();

  const defaultValues = useMemo(
    () => toFormValues(data),
    [data, numericJobId],
  );

  useEffect(() => {
    if (data) {
      userForm.setFieldsValue(toFormValues(data));
    }
  }, [data]);

  const isSubmitting: boolean = isCreating || isUpdating;
  const isEdit: boolean = Boolean(numericJobId);

  const handleSubmit = async (values: UserFormValues) => {
    const payload = toApiPayload(values);

    try {
      if (isEdit && data?.id) {
        const { password, roleId, ...updatePayload } = payload;
        const response = await updateUser({
          id: data.id,
          payload: updatePayload,
        });
        if (response && response.status === 200) {
          AppToast.success(response.data?.message ?? "User updated");
        }
      } else {
        const response = await createUser(payload);
        if (response && response.status === 201) {
          AppToast.success(response.data?.message ?? "User created");
        }
      }
      router.replace("/users");
      return;
    } catch (error: any) {
      AppToast.error(error?.response?.data?.message ?? "Failed to save user");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-6">
        {isEdit ? "Update User" : "Create User"}
      </h2>
      <Form form={userForm} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <TextInput
              name="userName"
              label="User name"
              defaultValue={defaultValues?.userName}
              required={true}
              requiredMsg="User name is required"
              placeholder="Enter user name"
              className="w-full! h-10! md:h-8 lg:h-10"
            />
          </Col>
          {!isEdit && (
            <Col xs={24} sm={12}>
              <TextInput
                name="password"
                label="Password"
                isPassword={true}
                required={true}
                pattern={
                  /^(?=^[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9]).{6,12}$/
                }
                requiredMsg="Password is required"
                patternMsg="Password must be 6–12 chars, start uppercase, include special char + number."
                placeholder="Enter password"
                className="w-full! h-10! md:h-8 lg:h-10"
              />
            </Col>
          )}
          <Col xs={24} sm={12}>
            <TextInput
              name="fullName"
              label="Full name"
              defaultValue={defaultValues?.fullName}
              required={true}
              requiredMsg="Full name is required"
              placeholder="Enter full name"
              className="w-full! h-10! md:h-8 lg:h-10"
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="email"
              label="Email"
              defaultValue={defaultValues?.email}
              required={true}
              type="email"
              requiredMsg="Email is required"
              typeMsg="Invalid email"
              placeholder="Enter email"
              className="w-full! h-10! md:h-8 lg:h-10"
            />
          </Col>
          <Col xs={24} sm={12}>
            <TextInput
              name="phone"
              label="Mobile Number"
              defaultValue={defaultValues?.phone}
              required={true}
              pattern={/^[0-9]{10,15}$/}
              requiredMsg="Mobile Number is required"
              patternMsg="Phone number must be between 10 and 15 digits."
              placeholder="Enter mobile number"
              className="w-full! h-10! md:h-8 lg:h-10"
            />
          </Col>
          <Col xs={24} sm={12}>
            <SelectInput
              name="roleId"
              label="Role"
              defaultValue={defaultValues?.roleId}
              required={true}
              requiredMsg="Role is required"
              placeholder="Select role"
              options={roleList || []}
              disabled={isEdit}
              className="w-full! h-10! md:h-8 lg:h-10"
            />
          </Col>
          {isEdit && (
            <Col xs={24} sm={12}>
              <AppSwitch
                name="isActive"
                label="Status"
                defaultValue={defaultValues?.isActive}
              />
            </Col>
          )}
        </Row>
        <Row gutter={[12, 12]} justify="end" className="mt-4">
          <Col xs={24} sm={8} md={6} lg={4}>
            <AppButton
              block
              label="Reset"
              onClick={() => userForm.resetFields()}
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
