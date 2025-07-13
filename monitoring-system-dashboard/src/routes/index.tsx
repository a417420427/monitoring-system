import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import ProjectList from '@/pages/ProjectList'
import UserList from '@/pages/UserList'
import NotFound from '@/pages/NotFound'
import Register from '@/pages/Register'
import PerformanceDashboard from '@/pages/PerformanceDashboard'
import { ApiKeyManager } from '@/pages/ApiKeyManager'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'projectList', element: <ProjectList /> },
      { path: 'userList', element: <UserList /> },
      { path: 'performanceDashboard', element: <PerformanceDashboard /> },
      { path: 'apiKeyManager/:id', element: <ApiKeyManager /> },
      
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '*', element: <NotFound /> },
])
