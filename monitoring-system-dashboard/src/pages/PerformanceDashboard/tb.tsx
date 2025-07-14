import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import datjs from "dayjs";
import type { PerformanceRecord } from "@/service/api/performanceService";

interface Props {
  data: PerformanceRecord[];
  loading: boolean;
}

const PerformanceTable: React.FC<Props> = ({ data, loading }) => {
  const columns: ColumnsType<PerformanceRecord> = [
    {
      title: "Project ID",
      dataIndex: "projectId",
      key: "projectId",
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "设备类型",
      dataIndex: "deviceType",
      key: "deviceType",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "浏览器",
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: "系统",
      dataIndex: "os",
      key: "os",
    },
    {
      title: "FP",
      dataIndex: ["payload", "fp"],
      key: "fp",
    },
    {
      title: "CLS",
      dataIndex: ["payload", "cls"],
      key: "cls",
    },
    {
      title: "INP",
      dataIndex: ["payload", "inp"],
      key: "inp",
    },
    {
      title: "LCP",
      dataIndex: ["payload", "lcp"],
      key: "lcp",
    },
    {
      title: "上报时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => datjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  return <Table rowKey="id" loading={loading} dataSource={data} columns={columns} pagination={{ pageSize: 10 }} />;
};

export default PerformanceTable;
