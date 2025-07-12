import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;



const items = [
  { key: "/", icon: <PieChartOutlined />, label: "首页" },
  { key: "2", icon: <DesktopOutlined />, label: "性能" },
  { key: "3", icon: <UserOutlined />, label: "JS错误" },
  { key: "4", icon: <TeamOutlined />, label: "行为" },
  { key: "5", icon: <FileOutlined />, label: "设置" },
  { key: "/projects", icon: <FileOutlined />, label: "项目" },
  { key: "/users", icon: <UserOutlined />, label: "用户" },
];

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
const navigate = useNavigate()

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255,255,255,0.3)",
          }}
        />
        <Menu
        selectedKeys={[location.pathname]}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
           onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{ padding: 0, backgroundColor: "#fff", textAlign: "center" }}
        >
          <Title level={3} style={{ margin: 0, lineHeight: "64px" }}>
            前端数据监控系统 Dashboard
          </Title>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©2025 前端监控系统 版权所有
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
