"use client";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  SolutionOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
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
    icon: <VideoCameraOutlined className="text-lg!" />,
    label: <Link href="/videos">Videos</Link>,
  },
  {
    key: "5",
    icon: <UploadOutlined className="text-lg!" />,
    label: <Link href="/uploads">Uploads</Link>,
  },
];