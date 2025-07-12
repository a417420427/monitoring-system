// src/pages/Dashboard.tsx

import { withAuth } from "@/components/withAuth";

const Dashboard = withAuth(() => {
  return <div>仪表盘内容（登录后可见）</div>;
});

export default Dashboard;
