import App from '../App';
import { createBrowserRouter } from 'react-router';
import { USER_ROLE } from '../constants';
import Register from '../pages/auth/register';
import Login from '../pages/auth/login';
import NotFoundPage from '../pages/not-found';
import HomePage from '../pages/public/home';
import VerifyEmail from '../pages/auth/verify-email';
import AboutPage from '../pages/public/about';
import ContactPage from '../pages/public/contact';
import ProtectedRoute from './ProtectedRoute';
import Profile from '../pages/private/profile';
import Setting from '../pages/private/setting';
import Dashboard from '../pages/admin/dashboard';
import ForgotPassword from '../pages/auth/forgot-password';
import ResetPassword from '../pages/auth/reset-password';
import AuthLayout from '../AuthLayout';

const { ADMIN, USER, SELLER, MANAGER } = USER_ROLE;

const router = createBrowserRouter([
  { path: '*', element: <NotFoundPage /> },
  //Public Routes
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
  //Auth Routes
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmail />,
      },
    ],
  },
  //Protected Routes
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'setting',
        element: (
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        ),
      },
    ],
  },
  //Admin Routes
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute requiredRoles={[ADMIN]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  //Manager Routes
  //Seller Routes
  //User Routes
]);

export default router;
