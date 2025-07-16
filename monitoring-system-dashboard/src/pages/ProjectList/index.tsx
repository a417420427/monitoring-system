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
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;



const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [pagination, setPagination] = useState<PageNationMeta>({
    page: 1,
    size: 10,
    total: 0,
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      if (isEditing) {
        const response = await updateProject(values.id, {
          status: values.status,
        });
        const { data, status } = response;
        if (status === 200 && data.data) {
          message.success("项目修改成功");
          fetchProjects(pagination.page, pagination.size);
        }
      } else {
        const response = await createProject({
          name: values.name,
          category: values.category,
        });

        const { data, status } = response;
        if (status === 200 && data.data) {
          message.success("项目创建成功");
          fetchProjects(1, pagination.size); // 创建后回到第一页
        }
      }

      form.resetFields();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      message.error("操作失败，请检查输入");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteProject(id);
      const { data, status } = response;
      if (status === 200 && data.success) {
        message.success("项目删除成功");
        // 如果当前页只剩一条数据，且不是第一页，则返回上一页
        const newCurrent = 
          projects.length === 1 && pagination.page > 1 
            ? pagination.page - 1 
            : pagination.page;
        fetchProjects(newCurrent, pagination.size);
      }
    } catch (error) {
      console.log(error)
      message.error("删除失败");
    }
  };

  const onEditRow = (row: ProjectResponse) => {
    setIsEditing(true);
    form.setFieldsValue(row);
    setIsModalOpen(true);
  };

  const fetchProjects = async (page: number = 1, size: number = 5) => {
    try {
      setLoading(true);
      const response = await getProjects({ page, size });
      
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
      console.error('获取项目列表失败:', error);
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
    fetchProjects(page, size);
  };

  useEffect(() => {
    fetchProjects(pagination.page, pagination.size);
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
      title: "API Key",
      dataIndex: "id",
      render: (id: string) => (
        <Tag
          onClick={() => navigate(`/apiKeyManager/${id}`)}
          style={{ cursor: "pointer" }}
        >
          查看
        </Tag>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
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
            title="是否确定删除该项目"
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
        loading={loading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          pageSizeOptions: ['10', '20', '50'],
        }}
        onChange={handleTableChange}
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