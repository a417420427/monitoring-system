import React from "react";
import { Card, Row, Col, Statistic } from "antd";

const Home: React.FC = () => {
  return (
    <div style={{ margin: "16px" }}>
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
          <li>
            TypeError: Cannot read property 'foo' of undefined at app.js:23
          </li>
          <li>ReferenceError: x is not defined at main.tsx:45</li>
          <li>
            Failed to load resource: the server responded with a status of 404
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Home;
