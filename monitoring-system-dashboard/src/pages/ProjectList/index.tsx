import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  Typography,
  Modal,
  Form,
  Input,
  message,
  Select,
  Radio,
  type TableProps,
  Popconfirm,
} from "antd";
import {
  categoryMaps,
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  type ProjectResponse,
} from "@/service/api/project";

const { Title } = Typography;

const initialProjects: ProjectResponse[] = [];

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleCreate = async () => {
    console.log(isEditing);

    try {
      const values = await form.validateFields();
      console.log(values, isEditing);
      if (isEditing) {
        const response = await updateProject(values.id, {
          status: values.status,
        });
        const { data, status } = response;
        if (status === 200 && data.data) {
          message.success("项目修改成功");
          initProjects();
        }
      } else {
        const response = await createProject({
          name: values.name,
          category: values.category,
        });

        const { data, status } = response;
        if (status === 200 && data.data) {
          message.success("项目创建成功");
          initProjects();
        }
      }

      form.resetFields();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      message.error("创建失败，请检查输入");
    }
  };

  const handleDelete = async (id: number) => {
    const response = await deleteProject(id);
    const { data, status } = response;
    if (status === 200 && data.success) {
      message.success("项目删除成功");
      initProjects();
    }
  };
  const onEditRow = (row: ProjectResponse) => {
    setIsEditing(true);
    form.setFieldsValue(row);
    setIsModalOpen(true);
  };
  const initProjects = async () => {
    const response = await getProjects();

    const { data, status } = response;
    if (status === 200 && data.data && data.success) {
      setProjects(data.data!.data);
      // setProjects(data.data)
    }
  };

  useEffect(() => {
    initProjects();
  }, []);
  const columns: TableProps<ProjectResponse>["columns"] = [
    {
      title: "项目名称",
      dataIndex: "name",
    },
    {
      title: "项目类型",
      dataIndex: "category",
      render: (status: ProjectResponse["category"]) => categoryMaps[status],
    },
    {
      title: "App ID",
      dataIndex: "appId",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status: ProjectResponse["status"]) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "启用" : "停用"}
        </Tag>
      ),
    },
    {
      title: "操作",
      render: (_: any, record: ProjectResponse) => (
        <Space>
          <Button onClick={() => onEditRow(record)} type="link">
            编辑
          </Button>
          <Popconfirm
            placement="top"
            title={"是否确定删除该项目"}
            okText="是"
            cancelText="否"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Title level={3}>项目列表</Title>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => {
          form.resetFields();
          setIsEditing(false);
          setIsModalOpen(true);
        }}
      >
        创建项目
      </Button>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={projects}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={isEditing ? "编辑项目" : "创建项目"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleCreate}
        okText={isEditing ? "保存" : "创建"}
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" noStyle>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            name="name"
            label="项目名称"
            rules={[{ required: true, message: "请输入项目名称" }]}
          >
            <Input disabled={isEditing} placeholder="请输入项目名称" />
          </Form.Item>
          <Form.Item
            name="category"
            label="项目分类"
            rules={[{ required: true, message: "请选择项目分类" }]}
          >
            <Select placeholder="请选择项目分类">
              <Select.Option value="web">Web</Select.Option>
              <Select.Option value="h5">H5</Select.Option>
              <Select.Option value="miniapp">小程序</Select.Option>
              <Select.Option value="backend">后端服务</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="项目状态"
            rules={[{ required: true, message: "请选择项目状态" }]}
          >
            <Radio.Group>
              <Radio value="active">启用</Radio>
              <Radio value="inactive">停用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectList;
