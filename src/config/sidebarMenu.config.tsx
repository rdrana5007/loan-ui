import type { MenuProps } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export const sidebarMenuItems: MenuProps['items'] = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link href="/">Dashboard</Link>,
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: <Link href="/users">Users</Link>,
  },
  {
    key: "3",
    icon: <UserOutlined />,
    label: <Link href="/customers">Customers</Link>,
  },
  {
    key: "4",
    icon: <VideoCameraOutlined />,
    label: <Link href="/videos">Videos</Link>,
  },
  {
    key: "5",
    icon: <UploadOutlined />,
    label: <Link href="/uploads">Uploads</Link>,
  },
];