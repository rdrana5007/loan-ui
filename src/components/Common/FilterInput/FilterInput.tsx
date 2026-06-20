"use client";
import { Select } from "antd";
import { FC } from "react";

interface FilterInputProps {
  placeholder: string;
  filterKey: string;
  value: string;
  options: { label: string | number; value: string | number }[];
  className: string;
  onChange: (name: string, value: string | undefined) => void;
}

export const FilterInput: FC<FilterInputProps> = ({
  placeholder,
  filterKey,
  value,
  options,
  className = "",
  onChange,
}) => {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      options={options}
      className={className ? className : ""}
      onChange={(value) => onChange(filterKey, value)}
    />
  );
};
