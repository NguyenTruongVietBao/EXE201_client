import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import useAuthStore from '../stores/useAuthStore';
import { USER_ROLE } from '../constants';
import LoadingPage from '../components/common/LoadingPage';

const { ADMIN, MANAGER, SELLER, CUSTOMER } = USER_ROLE;

const ProtectedRoute = ({
  children,
  requiredRoles = [],
  redirectTo = '/login',
  fallback = null,
}) => {
  const { isAuthenticated, user, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Hiển thị loading khi đang check auth
  if (isLoading) {
    return (
      fallback || <LoadingPage message='Đang kiểm tra quyền truy cập...' />
    );
  }

  // Redirect nếu chưa đăng nhập
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check role-based access nếu có yêu cầu
  if (requiredRoles.length > 0 && user?.role) {
    const hasPermission = requiredRoles.includes(user.role);
    if (!hasPermission) {
      switch (user.role) {
        case ADMIN:
          return <Navigate to='/admin' replace />;
        case MANAGER:
          return <Navigate to='/manager' replace />;
        case SELLER:
          return <Navigate to='/seller' replace />;
        case CUSTOMER:
          return <Navigate to='/customer' replace />;
        default:
          return <Navigate to='/' replace />;
      }
    }
  }
  // Render children nếu pass tất cả checks
  return children;
};

export default ProtectedRoute;
