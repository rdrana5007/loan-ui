"use client";
import { Form, Card, Typography } from "antd";
import Link from "next/link";
import { useAuthentication } from "@/hooks";
import { AppButton, TextInput } from "@/components/Common";
import Image from "next/image";
import Logo from "@/assets/Logo1.png";

const { Title, Text } = Typography;

export const Login = () => {
  const { handleLogin, isLoginPending } = useAuthentication();
  const [loginForm] = Form.useForm();

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden lg:flex items-center justify-center bg-linear-to-br from-indigo-700 to-blue-600 text-white px-8 xl:px-12 py-10">
        <div className="max-w-md">
          <h1 className="text-4xl xl:text-5xl font-bold mb-6">Welcome Back</h1>

          <p className="text-base xl:text-lg text-blue-100 leading-relaxed">
            Manage your projects, collaborate with your team, and stay
            productive from anywhere.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-linear-to-br from-indigo-600 via-blue-500 to-cyan-400 px-4 py-6 sm:px-6 md:px-8">
        <Card
          className="w-full max-w-md shadow-2xl rounded-2xl border-0"
          styles={{
            body: {
              padding: "24px",
            },
          }}
        >
          {/* Mobile Welcome Text */}
          <div className="lg:hidden text-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-center lg:text-left">
              Welcome Back
            </h2>
            <p className="text-sm lg:text-base text-gray-500 text-center lg:text-left">
              Sign in to continue to your account
            </p>
          </div>

          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-indigo-500 rounded-full flex items-center justify-center">
              <Image
                src={Logo}
                alt="Logo"
                width={60}
                height={60}
                priority
                sizes="100vw"
                className="object-cover transition-all duration-300"
              />
            </div>
            <Title
              level={2}
              className="mb-1! text-2xl! sm:text-3xl hidden lg:block"
            >
              Welcome Back
            </Title>
            <Text type="secondary" className="hidden lg:block">
              Sign in to continue to your account
            </Text>
          </div>

          <Form form={loginForm} layout="vertical" onFinish={handleLogin}>
            <TextInput
              name="email"
              label="Email"
              required={true}
              type="email"
              requiredMsg="Email is required"
              typeMsg="Invalid email"
              placeholder="Enter email"
            />
            <TextInput
              name="password"
              label="Password"
              isPassword={true}
              required={true}
              requiredMsg="Password is required"
              placeholder="Enter password"
            />
            {/* <Form.Item>
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm sm:text-base"
                >
                  Forgot Password
                </Link>
              </div>
            </Form.Item> */}
            <Form.Item>
              <AppButton
                type="primary"
                size="large"
                htmlType="submit"
                block
                label={isLoginPending ? "Signing in..." : "Sign In"}
                disabled={isLoginPending}
                className={`h-12! rounded-lg! font-semibold! bg-indigo-500! text-white!`}
              />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
