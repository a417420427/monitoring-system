import React from 'react'
import { Layout, Menu, Card, Typography, Row, Col, Statistic } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout
const { Title } = Typography

const items = [
  { key: '1', icon: <PieChartOutlined />, label: '首页' },
  { key: '2', icon: <DesktopOutlined />, label: '性能' },
  { key: '3', icon: <UserOutlined />, label: 'JS错误' },
  { key: '4', icon: <TeamOutlined />, label: '行为' },
  { key: '5', icon: <FileOutlined />, label: '设置' },
]

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false)

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.3)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, backgroundColor: '#fff', textAlign: 'center' }}>
          <Title level={3} style={{ margin: 0, lineHeight: '64px' }}>
            前端数据监控系统 Dashboard
          </Title>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic title="页面加载时间（ms）" value={1234} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="JavaScript 错误数" value={5} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="用户点击次数" value={87} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="当前在线用户" value={43} />
              </Card>
            </Col>
          </Row>

          <Card title="最近错误日志" style={{ marginTop: 16 }}>
            <ul>
              <li>TypeError: Cannot read property 'foo' of undefined at app.js:23</li>
              <li>ReferenceError: x is not defined at main.tsx:45</li>
              <li>Failed to load resource: the server responded with a status of 404</li>
            </ul>
          </Card>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2025 前端监控系统 版权所有
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Home
