"use client";
import { Form, Select } from "antd";

interface SelectInputProps {
  name: string;
  label: string;
  defaultValue?: string | number;
  required?: boolean;
  requiredMsg?: string;
  placeholder: string;
  options: { label: string | number; value: string | number }[];
  disabled?: boolean;
  className?: string;
}

export const SelectInput = ({
  name,
  label,
  defaultValue,
  required = false,
  requiredMsg,
  placeholder,
  options,
  disabled = false,
  className = "",
}: SelectInputProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={required ? [{ required, message: requiredMsg }] : []}
      initialValue={defaultValue}
    >
      <Select
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        className={className ? className : "w-full! h-10! md:h-8 lg:h-10"}
      />
    </Form.Item>
  );
};
