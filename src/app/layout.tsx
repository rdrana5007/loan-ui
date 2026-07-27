import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BreadcrumbProvider } from "@/contexts";
import { App } from "@/components";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import QueryWrapper from "@/utils/QueryWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // title: "Create Next App",
  title: {
    default: "HNH Loan Portal",
    template: "%s | HNH Loan Portal"
  },
  description: "Loan Portal for HNH Loan Management"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AntdRegistry>
          <QueryWrapper>
            <BreadcrumbProvider>
              <App>{children}</App>
            </BreadcrumbProvider>
          </QueryWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
