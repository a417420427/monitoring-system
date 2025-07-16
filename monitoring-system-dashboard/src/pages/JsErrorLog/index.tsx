import React, { useEffect, useState } from "react";
import { Table, Tag, Typography, message } from "antd";
import dayjs from "dayjs";
import { getJsErrorList, type JsErrorRecord } from "@/service/api/jsError";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<JsErrorRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PageNationMeta>({
    page: 1,
    size: 10,
    total: 0,
  });

  const fetchList = async (page: number = 1, size: number = 5) => {
    try {
      setLoading(true);
      const response = await getJsErrorList({ page, size });

      const { data, status } = response;
      if (status === 200 && data.data && data.success) {
        setProjects(data.data || []);
        setPagination({
          page: data.meta!.page || page,
          size: data.meta!.size || size,
          total: data.meta!.total || 0,
        });
      }
    } catch (error) {
      console.error("获取项目列表失败:", error);
      message.error("获取项目列表失败");
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination: any) => {
    const { page, size } = pagination;
    setPagination({
      ...pagination,
      page,
      size,
    });
    fetchList(page, size);
  };

  useEffect(() => {
    fetchList(pagination.page, pagination.size);
  }, []);

  const columns: ColumnsType<JsErrorRecord> = [
    {
      title: "Project ID",
      dataIndex: "projectId",
      key: "projectId",
      width: 120,
    },
    {
      title: "页面URL",
      dataIndex: ["payload", "url"],
      key: "url",
      ellipsis: true,
      render: (text) => (
        <a href={text} target="_blank" rel="noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "错误信息",
      dataIndex: "message",
      key: "message",
      render: (text) => <Tag color="red">{text}</Tag>,
      ellipsis: true,
    },
    {
      title: "错误类型",
      dataIndex: ["payload", "type"],

      key: "type",
      render: (text) => <Tag color="orange">{text}</Tag>,
    },
    {
      title: "文件位置",
      key: "source",
      render: (_, row) =>
        row.payload ? (
          <span>
            {row.payload.filename}:{row.payload.lineno}:{row.payload.colno}
          </span>
        ) : null,
    },
    {
      title: "设备信息",
      key: "device",
      render: (_, record) => (
        <div>
          <div>{record.os}</div>
          <div>{record.browser}</div>
          {record.deviceType && <Tag>{record.deviceType}</Tag>}
        </div>
      ),
    },
    {
      title: "发生时间",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss"),
      sorter: (a, b) => a.clientTimestamp - b.clientTimestamp,
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <a onClick={() => console.log(record.payload?.stack)}>查看堆栈</a>
      ),
    },
  ];

  return (
    <>
      <Title level={3}>错误列表</Title>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={projects}
        loading={loading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          pageSizeOptions: ["10", "20", "50"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default ProjectList;
