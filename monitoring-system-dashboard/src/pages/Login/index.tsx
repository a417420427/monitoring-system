import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, message, Card, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useUserStore } from '@/store/user';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setUserInfo } = useUserStore();

  const from = (location.state as any)?.from?.pathname || '/';

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      // TODO: 替换为真实接口请求
      if (values.username === 'admin' && values.password === '123456') {
        setToken('mock-token-123456');
        setUserInfo({ id: '1', username: 'admin', email: 'admin@example.com' });
        message.success('登录成功');
        navigate(from, { replace: true });
      } else {
        message.error('用户名或密码错误');
      }
    } catch (err) {
      console.log(err)
      message.error('登录失败');
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="后台登录" style={{ width: 360 }}>
        <Form name="login-form" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
              <Button type="default" block onClick={() => navigate('/register')}>
                注册账号
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
