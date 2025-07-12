import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">首页</Link> | <Link to="/dashboard">仪表盘</Link>
      </nav>
      <div style={{ padding: '2rem' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
