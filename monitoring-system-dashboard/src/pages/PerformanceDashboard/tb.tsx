import { Modal, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import datjs from "dayjs";
import type { PerformanceRecord } from "@/service/api/performanceService";
import PerformanceDetail from "./PerformanceDetail";

interface Props {
  data: PerformanceRecord[];
  loading: boolean;
}

const PerformanceTable: React.FC<Props> = ({ data, loading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState<PerformanceRecord | null>(
    null
  );
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
      title: "路径",
      dataIndex: ["payload", "url"],
      key: "url",
      render: (text) => (
        <a href={text} target="_blank" rel="noreferrer">
          {text ? new URL(text).pathname : ""}
        </a>
      ),
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
    {
      title: "操作",
      key: "action",
      width: 100,
      render: (_, record) => (
        <a
          onClick={() => {
            setIsModalOpen(true);
            setActiveRecord(record);
          }}
        >
          查看
        </a>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
      ;
      <Modal
        width={900}
        title={"指标详情"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <PerformanceDetail data={activeRecord?.payload} />
      </Modal>
    </>
  );
};

export default PerformanceTable;
