import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Card, Space } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import { register } from "@/service/api/auth";
import { useUserStore } from "@/store/user";

const Register = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { setToken, setUserInfo } = useUserStore();

  const from = (location.state as any)?.from?.pathname || "/";
  const onFinish = async (values: {
    username: string;
    email: string;
    password: string;
    confirm: string;
  }) => {
    try {
      if (values.password !== values.confirm) {
        message.error("两次输入的密码不一致");
        return;
      }

      console.log(values, 's');

      const { data, status } = await register({
        username: values.username,
        password: values.password,
        email: values.email,
      });

      if (status === 200 && data.success && data.data) {
        setToken(data.data.token);
        setUserInfo(data.data);
        message.success("注册成功");
        navigate(from, { replace: true });
      }
      console.log("注册参数:", values);
    } catch (err) {
      console.log(err);
      message.error("注册失败");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card title="注册新账号" style={{ width: 360 }}>
        <Form
          name="register-form"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: "请输入邮箱" },
              { type: "email", message: "请输入有效的邮箱地址" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "请确认密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一致"));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="primary" htmlType="submit" block>
                注册
              </Button>
              <Button type="default" block onClick={() => navigate("/login")}>
                返回登录
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
