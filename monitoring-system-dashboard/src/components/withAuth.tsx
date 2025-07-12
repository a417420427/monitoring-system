import { useUserStore } from '@/store/user';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function WrappedComponent(props: T) {
    const token = useUserStore((s) => s.token);
    const location = useLocation();

    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Component {...props} />;
  };
}
