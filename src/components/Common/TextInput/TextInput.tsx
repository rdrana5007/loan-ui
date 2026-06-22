"use client";
import { Form, Input } from "antd";

interface TextInputProps {
  name: string;
  label: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: "string" | "number" | "boolean" | "url" | "email";
  pattern?: RegExp;
  requiredMsg?: string;
  typeMsg?: string | undefined;
  patternMsg?: string;
  placeholder: string;
  className?: string;
  isPassword?: boolean;
}

export const TextInput = ({
  name,
  label,
  defaultValue,
  required = false,
  type,
  pattern,
  requiredMsg,
  typeMsg,
  patternMsg,
  placeholder,
  className = "",
  isPassword = false,
}: TextInputProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      initialValue={defaultValue}
      rules={[
        required ? { required, message: requiredMsg } : {},
        type ? { type, message: typeMsg } : {},
        pattern ? { pattern, message: patternMsg } : {},
      ].filter(Boolean)}
    >
      {isPassword ? (
        <Input.Password
          placeholder={placeholder}
          className={className ? className : "w-full! h-10! md:h-8 lg:h-10"}
        />
      ) : (
        <Input
          placeholder={placeholder}
          className={className ? className : "w-full! h-10! md:h-8 lg:h-10"}
        />
      )}
    </Form.Item>
  );
};
