"use client";
import { Avatar, Dropdown, Layout, MenuProps, Space, theme } from "antd";
import clsx from "clsx";
import { AppButton } from "../../Common";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { DROPDOWN_ITEMS } from "@/config";
import { useAuthentication } from "@/hooks";
import { useRouter } from "next/navigation";

const { Header } = Layout;

interface LayoutHeaderProps {
  isMobile: boolean;
  collapsed: boolean;
  onToggleSidebar: () => void;
}

export const LayoutHeader = ({
  isMobile,
  collapsed,
  onToggleSidebar,
}: LayoutHeaderProps) => {
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { handleLogout } = useAuthentication();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const headerIcon =
    isMobile || collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout();
        break;
      case "profile":
        router.push("/profile");
        break;
    }
  };

  return (
    <Header
      style={{
        background: colorBgContainer,
        padding: 8,
        transition: "left 0.3s cubic-bezier(0.3, 0, 0, 1)",
      }}
      className={clsx(
        "fixed top-0 right-0 z-50 flex h-16 items-center px-4 shadow-sm",
        collapsed ? "desktop-header-collapsed" : "desktop-header",
      )}
    >
      <div>
        <AppButton
          type="text"
          icon={headerIcon}
          onClick={onToggleSidebar}
          className="flex h-10! w-10! items-center justify-center"
        />
      </div>
      <div className="ml-auto">
        <Dropdown
          open={isDropdownOpen}
          onOpenChange={setIsDropdownOpen}
          menu={{
            items: DROPDOWN_ITEMS,
            onClick: onMenuClick,
          }}
          trigger={["click"]}
        >
          <Space className="cursor-pointer rounded-lg px-2 py-1">
            <Avatar
              size={isMobile ? "medium" : "large"}
              icon={<UserOutlined />}
            />
            <div className=" text-left md:block">
              <div className="font-semibold leading-none">Admin</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
            {isDropdownOpen ? (
              <UpOutlined className="text-sm text-gray-500" />
            ) : (
              <DownOutlined className="text-sm text-gray-500" />
            )}
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
};
