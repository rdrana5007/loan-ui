"use client";
import { Input } from "antd";
import { FC, ReactNode } from "react";

interface SearchInputProps {
  prefixIcon: ReactNode;
  value: string;
  className: string;
  onSearch: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ prefixIcon, value, className = "", onSearch }) => {
  return (
    <Input
      placeholder="Search here..."
      prefix={prefixIcon}
      value={value}
      className={className ? className : ""}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};
