import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

// Hook để protect routes - redirect nếu chưa đăng nhập
export const useAuthGuard = (redirectTo = '/login') => {
  const navigate = useNavigate();
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();

    if (!isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo, initializeAuth]);

  return isAuthenticated;
};

// Hook để redirect nếu đã đăng nhập (cho trang login/register)
export const useGuestGuard = (redirectTo = '/dashboard') => {
  const navigate = useNavigate();
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();

    if (isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo, initializeAuth]);

  return !isAuthenticated;
};

// Hook để check role-based access
export const useRoleGuard = (
  allowedRoles = [],
  redirectTo = '/unauthorized'
) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (allowedRoles.length > 0 && user?.role) {
      const hasPermission = allowedRoles.includes(user.role);
      if (!hasPermission) {
        navigate(redirectTo);
      }
    }
  }, [
    isAuthenticated,
    user,
    allowedRoles,
    navigate,
    redirectTo,
    initializeAuth,
  ]);

  const hasPermission =
    allowedRoles.length === 0 ||
    (user?.role && allowedRoles.includes(user.role));

  return { isAuthenticated, hasPermission };
};
