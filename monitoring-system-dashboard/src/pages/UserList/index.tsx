import React from 'react'
import { Table, Typography, Tag } from 'antd'

const { Title } = Typography

interface User {
  id: string
  ip: string
  lastActiveAt: string
  activityScore: number
}

const mockUsers: User[] = [
  {
    id: 'u-001',
    ip: '192.168.0.101',
    lastActiveAt: '2025-07-12 10:21:00',
    activityScore: 87,
  },
  {
    id: 'u-002',
    ip: '10.0.3.45',
    lastActiveAt: '2025-07-12 09:55:30',
    activityScore: 42,
  },
]

const UserList: React.FC = () => {
  const columns = [
    {
      title: '用户 ID',
      dataIndex: 'id',
    },
    {
      title: 'IP 地址',
      dataIndex: 'ip',
    },
    {
      title: '最后活跃时间',
      dataIndex: 'lastActiveAt',
    },
    {
      title: '活跃度',
      dataIndex: 'activityScore',
      render: (score: number) => (
        <Tag color={score > 50 ? 'green' : 'orange'}>{score}</Tag>
      ),
    },
  ]

  return (
    <>
      <Title level={3}>用户列表</Title>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={mockUsers}
        pagination={{ pageSize: 5 }}
      />
    </>
  )
}

export default UserList
