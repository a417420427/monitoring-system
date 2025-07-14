import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import dayjs from "dayjs";
import type { JsErrorRecord } from "@/service/api/jsError";


interface Props {
  data: JsErrorRecord[];
  loading: boolean;
}

const JsErrorTable: React.FC<Props> = ({ data, loading }) => {
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
      render: (text) => <a href={text} target="_blank" rel="noreferrer">{text}</a>,
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
      render: (_, row) => (
      row.payload ?  <span>
          {row.payload.filename}:{row.payload.lineno}:{row.payload.colno}
        </span> : null
      ),
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
      sorter: (a, b) => a.clientTimestamp - b.clientTimestamp
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
    <Table
      rowKey="id"
      loading={loading}
      dataSource={data}
      columns={columns}
      pagination={{ pageSize: 10 }}
      expandable={{
        expandedRowRender: (record) => (
          <pre style={{ margin: 0 }}>
            <code>{record.payload?.stack}</code>
          </pre>
        ),
        rowExpandable: (record) => !!record.payload?.stack,
      }}
    />
  );
};

export default JsErrorTable;