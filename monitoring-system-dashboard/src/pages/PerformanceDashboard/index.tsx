import React, { useState, useEffect } from "react";
import {
  Card,
  Select,
  Table,
  Typography,
  DatePicker,
  Button,
  Form,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { RangeValue } from "rc-picker/lib/interface";
import dayjs from "dayjs";
import ReactECharts from "echarts-for-react";

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface PerformanceMetrics {
  projectId: string;
  projectName: string;
  pagePath: string;
  FCP: number;
  LCP: number;
  FID: number;
  TTFB: number;
  CLS: number;
  FP: number;
  timestamp: string;
}

const mockProjects = [
  { id: "1", name: "项目A" },
  { id: "2", name: "项目B" },
];

const mockData: Record<string, PerformanceMetrics[]> = {
  "1": [
    {
      projectId: "1",
      projectName: "项目A",
      pagePath: "/home",
      FCP: 1234,
      LCP: 2123,
      FID: 45,
      TTFB: 150,
      CLS: 0.1,
      FP: 1100,
      timestamp: "2025-07-13 10:00",
    },
    {
      projectId: "1",
      projectName: "项目A",
      pagePath: "/product",
      FCP: 1500,
      LCP: 2500,
      FID: 50,
      TTFB: 180,
      CLS: 0.05,
      FP: 1300,
      timestamp: "2025-07-12 15:30",
    },
    {
      projectId: "1",
      projectName: "项目A",
      pagePath: "/home",
      FCP: 1100,
      LCP: 2000,
      FID: 48,
      TTFB: 160,
      CLS: 0.08,
      FP: 1050,
      timestamp: "2025-07-13 10:20",
    },
  ],
};

const PerformanceDashboard: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>("1");
  const [selectedPage, setSelectedPage] = useState<string | undefined>(undefined);
  const [timeRange, setTimeRange] = useState<RangeValue<dayjs.Dayjs>>(null);
  const [data, setData] = useState<PerformanceMetrics[]>([]);
  const [filteredData, setFilteredData] = useState<PerformanceMetrics[]>([]);

  useEffect(() => {
    const result = mockData[selectedProject] || [];
    setData(result);
    setFilteredData(result);
  }, [selectedProject]);

  const handleFilter = () => {
    let filtered = [...data];

    if (selectedPage) {
      filtered = filtered.filter((item) => item.pagePath === selectedPage);
    }

    if (timeRange && timeRange[0] && timeRange[1]) {
      filtered = filtered.filter((item) => {
        const ts = dayjs(item.timestamp);
        return ts.isAfter(timeRange[0]) && ts.isBefore(timeRange[1]);
      });
    }

    setFilteredData(filtered);
  };

  const columns: ColumnsType<PerformanceMetrics> = [
    { title: "时间", dataIndex: "timestamp", key: "timestamp" },
    { title: "页面", dataIndex: "pagePath", key: "pagePath" },
    { title: "FCP", dataIndex: "FCP", key: "FCP" },
    { title: "LCP", dataIndex: "LCP", key: "LCP" },
    { title: "FID", dataIndex: "FID", key: "FID" },
    { title: "TTFB", dataIndex: "TTFB", key: "TTFB" },
    { title: "CLS", dataIndex: "CLS", key: "CLS" },
    { title: "FP", dataIndex: "FP", key: "FP" },
  ];

  const uniquePages = Array.from(new Set(data.map((item) => item.pagePath)));

  const getChartOption = () => {
    const sorted = [...filteredData].sort((a, b) =>
      dayjs(a.timestamp).valueOf() - dayjs(b.timestamp).valueOf()
    );

    const timestamps = sorted.map((item) => item.timestamp);
    const FCPs = sorted.map((item) => item.FCP);
    const LCPs = sorted.map((item) => item.LCP);
    const FIDs = sorted.map((item) => item.FID);

    return {
      title: {
        text: "性能趋势图",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["FCP", "LCP", "FID"],
        top: 30,
      },
      xAxis: {
        type: "category",
        data: timestamps,
        name: "时间",
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: "value",
        name: "ms",
      },
      series: [
        {
          name: "FCP",
          type: "line",
          data: FCPs,
          smooth: true,
        },
        {
          name: "LCP",
          type: "line",
          data: LCPs,
          smooth: true,
        },
        {
          name: "FID",
          type: "line",
          data: FIDs,
          smooth: true,
        },
      ],
    };
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>性能监控总览</Title>

      <Form layout="inline" style={{ marginBottom: 24 }}>
        <Form.Item label="选择项目">
          <Select value={selectedProject} onChange={setSelectedProject} style={{ width: 150 }}>
            {mockProjects.map((p) => (
              <Option key={p.id} value={p.id}>
                {p.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="页面路径">
          <Select
            allowClear
            value={selectedPage}
            onChange={setSelectedPage}
            style={{ width: 150 }}
            placeholder="全部"
          >
            {uniquePages.map((page) => (
              <Option key={page} value={page}>
                {page}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="时间范围">
          <RangePicker value={timeRange} onChange={setTimeRange} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleFilter}>
            查询
          </Button>
        </Form.Item>
      </Form>

      <Card style={{ marginBottom: 24 }}>
        <ReactECharts option={getChartOption()} style={{ height: 400 }} />
      </Card>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey={(record) => `${record.timestamp}-${record.pagePath}`}
        pagination={false}
      />
    </div>
  );
};

export default PerformanceDashboard;
