import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Form, Typography, message, Card } from "antd";
import { jwtDecode } from "jwt-decode";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:9090/api/auth/login/logi", values);
      const token = response.data.token;
      sessionStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      sessionStorage.setItem("username", decodedToken.sub);
      sessionStorage.setItem("name", decodedToken.name);
      sessionStorage.setItem("contactNo", decodedToken.contact);

      message.success("Login successful!");

      if (decodedToken.sub === "admin@example.com") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
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
        className="w-full max-w-lg shadow-lg border-none" // Increased from max-w-md to max-w-lg
        style={{ backgroundColor: "#ffffff", borderRadius: "12px" }}
      >
        <div className="p-8"> {/* Increased padding from p-6 to p-8 */}
          <Title
            level={2}
            className="text-center mb-10" // Increased margin-bottom for spacing
            style={{ color: "#16a34a", fontWeight: "700", fontSize: "32px" }} // Increased font size
          >
            Welcome Back
          </Title>
          <Form
            layout="vertical"
            onFinish={onFinish}
            className="space-y-8" // Increased spacing between form items
          >
            <Form.Item
              label={<Text strong style={{ color: "#374151", fontSize: "16px" }}>Email Address</Text>} // Increased label font size
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                placeholder="Enter your email"
                size="large"
                className="rounded-md h-12 text-lg" // Increased height and font size
                style={{ borderColor: "#16a34a" }}
              />
            </Form.Item>
            <Form.Item
              label={<Text strong style={{ color: "#374151", fontSize: "16px" }}>Password</Text>} // Increased label font size
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                placeholder="Enter your password"
                size="large"
                className="rounded-md h-12 text-lg" // Increased height and font size
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
                height: "56px", // Increased button height
                fontWeight: "600",
                borderRadius: "8px",
                fontSize: "18px", // Increased button text size
              }}
              className="hover:!bg-green-700 transition-colors"
            >
              Login
            </Button>
          </Form>
          <div className="mt-8 text-center space-y-3"> {/* Increased margin-top and spacing */}
            <Text style={{ color: "#6b7280", fontSize: "16px" }}> {/* Increased font size */}
              Don’t have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#16a34a", fontWeight: "600", fontSize: "16px" }} // Increased font size
                className="hover:underline"
              >
                Sign up here
              </Link>
            </Text>
            <div>
              <Link
                to="/forgot-password"
                style={{ color: "#16a34a", fontWeight: "600", fontSize: "16px" }} // Increased font size
                className="hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;