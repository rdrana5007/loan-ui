"use client";
import { Form, Radio } from "antd";

interface RadioInputProps {
  name: string;
  label: string;
  required?: boolean;
  requiredMsg?: string;
  options: { label: string; value: string }[];
}

export const RadioInput = ({
  name,
  label,
  required = false,
  requiredMsg,
  options,
}: RadioInputProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={required ? [{ required, message: requiredMsg }] : undefined}
    >
      <Radio.Group options={options} />
    </Form.Item>
  );
};
