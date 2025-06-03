import { Navigate, Outlet } from 'react-router';
import useAuthStore from './stores/useAuthStore';
import useThemeStore from './stores/useThemeStore';
import Header from './components/layout/Header';
import { USER_ROLE } from './constants';

const { ADMIN, SELLER, MANAGER, CUSTOMER } = USER_ROLE;

function AuthLayout() {
  const { isAuthenticated, user } = useAuthStore();
  const { theme } = useThemeStore();

  if (isAuthenticated && user) {
    switch (user.role) {
      case ADMIN:
        return <Navigate to={'/admin'} replace />;
      case CUSTOMER:
        return <Navigate to={'/customer'} replace />;
      case 'User':
        return <Navigate to={'/customer'} replace />;
      case SELLER:
        return <Navigate to={'/seller'} replace />;
      case MANAGER:
        return <Navigate to={'/manager'} replace />;
      default:
        return <Navigate to={'/'} replace />;
    }
  }

  return (
    <div data-theme={theme}>
      <Header />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
