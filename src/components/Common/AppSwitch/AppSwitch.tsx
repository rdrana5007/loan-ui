"use client";
import { Form, Switch } from "antd";
import { FC } from "react";

interface AppSwitchProps {
  name: string;
  label: string;
  defaultValue?: boolean;
}

export const AppSwitch: FC<AppSwitchProps> = ({ name, label, defaultValue = false }) => {
  return (
    <Form.Item
      name={name}
      label={label}
      initialValue={defaultValue}
    >
      <Switch />
    </Form.Item>
  );
};
