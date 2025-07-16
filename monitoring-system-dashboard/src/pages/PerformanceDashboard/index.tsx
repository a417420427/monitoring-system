import React, { useEffect, useState } from "react";
import { Card, Modal, Table, Tag, Typography, message } from "antd";
import datjs from "dayjs";
import {
  getPerformanceList,
  type PerformanceRecord,
} from "@/service/api/performanceService";
import type { ColumnsType } from "antd/es/table";
import PerformanceDetail from "./PerformanceDetail";

const { Title } = Typography;

const PerformanceDashboard: React.FC = () => {
  const [data, setData] = useState<PerformanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState<PerformanceRecord | null>(
    null
  );
  const [pagination, setPagination] = useState<PageNationMeta>({
    page: 1,
    size: 10,
    total: 0,
  });

  const fetchData = async (page: number = 1, size: number = 10) => {
    try {
      setLoading(true);
      const res = await getPerformanceList({
        page,
        size,
      });

      console.log(res);
      if (res.status === 200 && res.data?.data) {
        setData(res.data.data || []);
        setPagination({
          ...pagination,
          page: res.data.meta!.page,
          size: res.data.meta!.size,
          total: res.data.meta!.total,
        });
      } else {
        message.error(res.data?.message || "获取数据失败");
      }
    } catch (error) {
      console.error("获取性能数据失败:", error);
      message.error("请求失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.page, pagination.size);
  }, []);

  const handleTableChange = (pagination: any) => {
    const { page, size } = pagination;
    setPagination({
      ...pagination,
      page,
      size,
    });
    fetchData(page, size);
  };

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
    <Card>
      <Title level={3}>前端性能日志</Title>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
      />

      <Modal
        width={1200}
        title={"指标详情"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <PerformanceDetail data={activeRecord?.payload} />
      </Modal>
    </Card>
  );
};

export default PerformanceDashboard;
