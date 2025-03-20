import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Form, Typography, message, Card } from "antd";

const { Title, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:9090/api/auth/register", values);
      message.success("Registration successful! Please login.");
      form.resetFields();
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        const backendErrors = {};
        error.response.data.forEach((errorMsg) => {
          if (errorMsg.includes("Contact number")) {
            backendErrors.contactNo = errorMsg;
          } else if (errorMsg.includes("Email")) {
            backendErrors.email = errorMsg;
          } else if (errorMsg.includes("Password")) {
            backendErrors.password = errorMsg;
          } else if (errorMsg.includes("Name")) {
            backendErrors.name = errorMsg;
          }
        });
        form.setFields(
          Object.keys(backendErrors).map((field) => ({
            name: field,
            errors: [backendErrors[field]],
          }))
        );
      } else {
        message.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-gray-50"
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      <Card
        className="w-full max-w-lg shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-1"
        style={{
          background: "linear-gradient(145deg, #ffffff, #f0f4f8)", // Subtle gradient background
          borderRadius: "16px", // More pronounced rounded corners
          border: "1px solid #16a34a", // Thin green border
        }}
      >
        <div className="p-8">
          <Title
            level={2}
            className="text-center mb-10"
            style={{ color: "#16a34a", fontWeight: "700", fontSize: "32px" }}
        
            Create Your Account
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-8"
          >
            <Form.Item
              label={<Text strong style={{ color: "#374151", fontSize: "16px" }}>Full Name</Text>}
              name="name"
              rules={[{ required: true, message: "Please enter your full name" }]}
            >
              <Input
                placeholder="Enter your full name"
                size="large"
                className="rounded-md h-12 text-lg"
                style={{ borderColor: "#16a34a" }}
              />
            </Form.Item>

            <Form.Item
              label={<Text strong style={{ color: "#374151", fontSize: "16px" }}>Email Address</Text>}
              name="email"
              rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Please enter a valid email" }]}
            >
              <Input
                placeholder="Enter your email address"
                size="large"
                className="rounded-md h-12 text-lg"
                style={{ borderColor: "#16a34a" }}
              />
            </Form.Item>

            <Form.Item
              label={<Text strong style={{ color: "#374151", fontSize: "16px" }}>Password</Text>}
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.",
                },
              ]}
            >
              <Input.Password
                placeholder="Create a strong password"
                size="large"
                className="rounded-md h-12 text-lg"
                style={{ borderColor: "#16a34a" }}
              />
            </Form.Item>

            <Form.Item
              label={<Text strong style={{ color: "#374151", fontSize: "16px" }}>Contact Number</Text>}
              name="contactNo"
              rules={[{ required: true, message: "Please enter your contact number" }]}
            >
              <Input
                placeholder="Enter your contact number"
                size="large"
                className="rounded-md h-12 text-lg"
                style={{ borderColor: "#16a34a" }}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
              style={{
                backgroundColor: "#16a34a",
                borderColor: "#16a34a",
                height: "56px",
                fontWeight: "600",
                borderRadius: "8px",
                fontSize: "18px",
              }}
              className="hover:!bg-green-700 transition-colors"
            >
              Sign Up
            </Button>
          </Form>
          <div className="mt-8 text-center space-y-3">
            <Text style={{ color: "#6b7280", fontSize: "16px" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#16a34a", fontWeight: "600", fontSize: "16px" }}
                className="hover:underline"
              >
                Login here
              </Link>
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;