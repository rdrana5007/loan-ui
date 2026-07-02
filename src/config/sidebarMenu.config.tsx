"use client";
import type { MenuProps } from "antd";
import {
  BankOutlined,
  DashboardOutlined,
  MoneyCollectOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export const SIDEBAR_MENU_ITEMS: MenuProps['items'] = [
  {
    key: "1",
    icon: <DashboardOutlined className="text-lg!" />,
    label: <Link href="/">Dashboard</Link>,
  },
  {
    key: "2",
    icon: <UserOutlined className="text-lg!" />,
    label: <Link href="/users">Users</Link>,
  },
  {
    key: "3",
    icon: <SolutionOutlined className="text-lg!" />,
    label: <Link href="/customers">Customers</Link>,
  },
  {
    key: "4",
    icon: <BankOutlined className="text-lg!" />,
    label: <Link href="/loans">Loans</Link>,
    // label: <Link href="/loans">Users</Link>,
  },
  // {
  //   key: "5",
  //   icon: <MoneyCollectOutlined className="text-lg!" />,
  //   label: <Link href="/emi-collections">Emi Collections</Link>,
  // },
  // {
  //   key: "6",
  //   icon: <ScheduleOutlined className="text-lg!" />,
  //   label: <Link href="/emi-followups">Emi Followups</Link>,
  // }
];