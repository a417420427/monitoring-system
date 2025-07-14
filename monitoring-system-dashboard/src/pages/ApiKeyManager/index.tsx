import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Popconfirm,
  message,
  Input,
  Modal,
  Form,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import {
  getApiKeys,
  type ApiKeyResponse,
  createApiKey,
  toggleApiKeyStatus,
  deleteApiKey,
} from "@/service/api/apikey";

export const ApiKeyManager: React.FC = () => {
  const params = useParams();
  const projectId = params.id;
  const [data, setData] = useState<ApiKeyResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const res = await getApiKeys(Number(projectId));
      if (res.status === 200 && res.data.success) {
        setData(res.data.data!);
      }
    } catch (err) {
      console.log(err);
      message.error("获取 API Key 列表失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchKeys();
    }
  }, [projectId]);

  const handleCreateKey = async () => {
    try {
      const { label } = await form.validateFields();
      const res = await createApiKey({
        projectId: Number(projectId),
        label,
      });

      if (res.data.success) {
        message.success("API Key 生成成功");
        setModalVisible(false);
        form.resetFields();
        fetchKeys();
      } else {
        message.error(res.data.message || "生成失败");
      }
    } catch (err) {
      console.log(err);
      // 用户取消或表单校验失败，不处理
    }
  };

  const toggleKey = async (id: number, status: "enabled" | "disabled") => {
    try {
      const response = await toggleApiKeyStatus(
        id,
        status
      );
      if (response.status === 200 && response.data.success) {
        message.success("状态已更新");
      }
      fetchKeys();
    } catch {
      message.error("更新状态失败");
    }
  };

  const deleteKey = async (id: number) => {
    try {
      const response = await deleteApiKey(id);
      if (response.status === 200 && response.data.success) {
        message.success("删除成功");
      }

      fetchKeys();
    } catch {
      message.error("删除失败");
    }
  };

  const columns: ColumnsType<ApiKeyResponse> = [
    {
      title: "Key",
      dataIndex: "key",
      render: (text) => <Input value={text} readOnly style={{ width: 300 }} />,
    },
    {
      title: "标签",
      dataIndex: "label",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "enabled" ? "green" : "red"}>
          {status === "enabled" ? "启用" : "禁用"}
        </Tag>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "操作",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => toggleKey(record.id, record.status === "enabled" ? "disabled" : "enabled")}
          >
            {record.status === "enabled" ? "禁用" : "启用"}
          </Button>
          <Popconfirm
            title="确认删除这个 API Key？"
            onConfirm={() => deleteKey(record.id)}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        生成新 Key
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
      />
      <Modal
        title="生成新 API Key"
        visible={modalVisible}
        onOk={handleCreateKey}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        okText="生成"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="label"
            label="Key 标签"
            rules={[{ required: true, message: "请输入标签名称" }]}
          >
            <Input placeholder="例如：生产环境 Key" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
