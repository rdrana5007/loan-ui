"use client";
import { FC, ReactNode, useMemo, useState } from "react";
import { Breadcrumb, Drawer, Layout, Menu, theme } from "antd";
import {
  CloseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { sidebarMenuItems } from "@/config";
import { AppButton } from "../Common";
import { useBreadcrumbs } from "@/contexts";
import { useResponsive } from "@/hooks";

interface AppProps {
  children: ReactNode;
  breadcrumbs?: string[];
}

const { Header, Sider, Content, Footer } = Layout;

export const App: FC<AppProps> = ({
  children,
  breadcrumbs: breadcrumbsProp,
}) => {
  const { breadcrumbs: breadcrumbsContext } = useBreadcrumbs();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const pathname = usePathname();
  const { isMobile } = useResponsive();
  const breadcrumbs =
    breadcrumbsContext.length > 0 ? breadcrumbsContext : breadcrumbsProp;
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const publicRoute = ["/login"];
  const isPublicRoute = publicRoute.some(
    (route) => pathname === route || pathname.startsWith(route),
  );

  const selectedKey = useMemo(() => {
    if (pathname.startsWith("/users")) return ["2"];
    if (pathname.startsWith("/customers")) return ["3"];
    if (pathname.startsWith("/videos")) return ["4"];
    if (pathname.startsWith("/uploads")) return ["5"];
    return ["1"];
  }, [pathname]);

  const defaultBreadcrumb = {
    title: "Home",
  };

  return (
    <>
      {isPublicRoute ? (
        <>{children}</>
      ) : (
        <Layout className="min-h-screen">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className="hidden md:block">
              <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={260}
                collapsedWidth={90}
                className="fixed left-0 top-0 h-screen overflow-auto shadow-lg bg-linear-to-br! from-indigo-700 to-blue-600"
                style={{
                  position: "fixed",
                  left: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <div className="flex h-16 items-center justify-center border-gray-700">
                  {/* <Image
                src="/logo.png"
                alt="Logo"
                width={collapsed ? 40 : 120}
                height={40}
                className="transition-all duration-300"
                priority
              /> */}
                  <div className="text-white">LOGO</div>
                </div>
                <Menu
                  theme="dark"
                  mode="inline"
                  items={sidebarMenuItems}
                  selectedKeys={selectedKey}
                  className="bg-transparent! text-base! font-medium"
                />
              </Sider>
            </div>
          )}

          {/* Mobile Drawer */}
          {isMobile && (
            <div className="block md:hidden">
              <Drawer
                placement="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                size={260}
                closable={false}
                styles={{
                  body: {
                    padding: 0,
                  },
                }}
                className="shadow-lg bg-linear-to-br! from-indigo-700 to-blue-600"
              >
                {/* Drawer Header */}
                <div className="flex h-16 items-center justify-between px-4">
                  {/* <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={40}
                priority
              /> */}
                  <div className="text-white">LOGO</div>
                  <AppButton
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => setDrawerOpen(false)}
                    className="text-white!"
                    size="large"
                  />
                </div>
                <Menu
                  mode="inline"
                  items={sidebarMenuItems}
                  onClick={() => setDrawerOpen(false)}
                  selectedKeys={selectedKey}
                  className="bg-transparent! text-white! text-base! font-medium"
                />
              </Drawer>
            </div>
          )}

          <Layout
            className={`${collapsed ? "desktop-sider-collapsed" : "desktop-sider"}`}
          >
            {/* Header */}
            <Header
              style={{
                background: colorBgContainer,
                padding: 8,
              }}
              className={`fixed top-0 right-0 z-50 flex h-16 items-center px-4 shadow-sm ${collapsed ? "desktop-header-collapsed" : "desktop-header"}`}
            >
              <AppButton
                type="text"
                icon={
                  isMobile ? (
                    <MenuUnfoldOutlined />
                  ) : collapsed ? (
                    <MenuUnfoldOutlined />
                  ) : (
                    <MenuFoldOutlined />
                  )
                }
                onClick={() => {
                  if (isMobile) {
                    setDrawerOpen(true);
                  } else {
                    setCollapsed(!collapsed);
                  }
                }}
                className="flex h-10 w-10 items-center justify-center"
              />
            </Header>

            {/* Content */}
            <Content className="mt-20! mx-3 mb-3 md:mx-4 md:mb-4">
              <div className="mb-3 overflow-x-auto">
                {breadcrumbs && breadcrumbs.length > 0 ? (
                  <Breadcrumb
                    className="whitespace-nowrap! text-sm! sm:text-base! font-bold"
                    items={[
                      defaultBreadcrumb,
                      ...breadcrumbs.map((crumb) => ({
                        title: crumb,
                      })),
                    ]}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="min-h-[calc(100vh-160px)] rounded-xl bg-white p-4 shadow-sm md:p-6">
                {children}
              </div>
            </Content>

            <Footer style={{ textAlign: "center" }}>
              Ant Design Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      )}
    </>
  );
};
