import React from "react";
import { Descriptions, Card } from "antd";

interface PerformanceData {
  fp: number;
  fcp: number;
  lcp: number;
  tbt: number;
  url: string;
  ttfb: number;
  pageId: string;
  dnsTime: number;
  sslTime: number;
  tcpTime: number;
  loadTime: number;
  domParseTime: number;
  responseTime: number;
  domContentLoaded: number;
}

const explanations: Record<keyof PerformanceData, string> = {
  fp: "First Paint (FP)：浏览器首次绘制时间，反映页面开始渲染的速度，单位毫秒。",
  fcp: "First Contentful Paint (FCP)：首次内容绘制时间，浏览器绘制第一个文本、图片等内容的时间。",
  lcp: "Largest Contentful Paint (LCP)：最大内容绘制时间，页面主内容加载完成的时间。",
  tbt: "Total Blocking Time (TBT)：总阻塞时间，长任务阻塞主线程的累计时间。",
  url: "页面地址。",
  ttfb: "Time To First Byte (TTFB)：从请求发出到收到第一个字节响应的时间。",
  pageId: "页面唯一标识。",
  dnsTime: "DNS 查询时间。",
  sslTime: "SSL 握手时间。",
  tcpTime: "TCP 连接时间。",
  loadTime: "页面加载完成时间。",
  domParseTime: "DOM 解析时间。",
  responseTime: "服务器响应时间。",
  domContentLoaded: "DOM 内容加载完成事件时间。",
};

interface Props {
  data:any;
}

const PerformanceDetail: React.FC<Props> = ({ data }) => {
  return (
    <Card title="性能指标详情" style={{ margin: "auto" }}>
      <Descriptions
        bordered
        column={2}
        size="middle"
        labelStyle={{ width: 220, fontWeight: "bold" }}
        contentStyle={{ width: 200 }}
      >
        {(Object.keys(data) as (keyof PerformanceData)[]).map((key) => (
          <Descriptions.Item key={key} label={`${key} (${explanations[key] || ""})`}>
            {typeof data[key] === "number"
              ? `${data[key].toFixed(2)} ms`
              : data[key]}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>
  );
};




export default PerformanceDetail
