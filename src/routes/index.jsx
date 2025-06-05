import App from '../App';
import { createBrowserRouter } from 'react-router';
import { USER_ROLE } from '../constants';
import Register from '../pages/auth/register';
import Login from '../pages/auth/login';
import NotFoundPage from '../pages/not-found';
import VerifyEmail from '../pages/auth/verify-email';
import AboutPage from '../pages/about';
import ContactPage from '../pages/contact';
import ProtectedRoute from './ProtectedRoute';
import Profile from '../pages/private/profile';
import ForgotPassword from '../pages/auth/forgot-password';
import ResetPassword from '../pages/auth/reset-password';
import AuthLayout from '../AuthLayout';
import RegisterSeller from '../pages/auth/register-seller';
import ChangePassword from '../pages/private/change-password';
import UpdateProfile from '../pages/private/update-profile';
import LandingPage from '../pages/landing-page';
import CustomerHome from '../pages/customer/home';
import ManagerDashboard from '../pages/manager/dashboard';
import AdminDashboard from '../pages/admin/dashboard';
import CustomerDocuments from '../pages/customer/documents';
import CustomerStudyPlan from '../pages/customer/study-plan';
import CustomerGroupChat from '../pages/customer/group-chat';
import SellerMyCourse from '../pages/seller/my-course';
import SellerBilling from '../pages/seller/billing';
import ManagerDocuments from '../pages/manager/documents';
import ManagerRevenue from '../pages/manager/revenue';
import CustomerMyDocument from '../pages/customer/my-document';
import SellerUploadDocument from '../pages/seller/upload-document';
import CustomerPartner from '../pages/customer/partner';

const { ADMIN, CUSTOMER, SELLER, MANAGER } = USER_ROLE;

const router = createBrowserRouter([
  //Public Routes
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <LandingPage />,
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
        path: 'register-seller',
        element: <RegisterSeller />,
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
  //Private Routes
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
        path: 'change-password',
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: 'update-profile',
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  //Customer Routes
  {
    path: '/customer',
    element: <App />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER, 'User']}>
            <CustomerHome />
          </ProtectedRoute>
        ),
      },
      {
        path: 'documents',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER, 'User']}>
            <CustomerDocuments />
          </ProtectedRoute>
        ),
      },
      {
        path: 'study-plan',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER, 'User']}>
            <CustomerStudyPlan />
          </ProtectedRoute>
        ),
      },
      {
        path: 'group-chat',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER, 'User']}>
            <CustomerGroupChat />
          </ProtectedRoute>
        ),
      },
      {
        path: 'my-documents',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER, 'User']}>
            <CustomerMyDocument />
          </ProtectedRoute>
        ),
      },
      {
        path: 'upload-document',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER, 'User']}>
            <SellerUploadDocument />
          </ProtectedRoute>
        ),
      },
      {
        path: 'partner',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER, 'User']}>
            <CustomerPartner />
          </ProtectedRoute>
        ),
      },
    ],
  },
  //Admin Routes
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute requiredRoles={[ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  //Manager Routes
  {
    path: '/manager',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute requiredRoles={[MANAGER]}>
            <ManagerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'documents',
        element: (
          <ProtectedRoute requiredRoles={[MANAGER]}>
            <ManagerDocuments />
          </ProtectedRoute>
        ),
      },
      {
        path: 'revenue',
        element: (
          <ProtectedRoute requiredRoles={[MANAGER]}>
            <ManagerRevenue />
          </ProtectedRoute>
        ),
      },
    ],
  },
  //Seller Routes
  {
    path: '/seller',
    element: <App />,
    children: [
      {
        path: 'my-course',
        element: (
          <ProtectedRoute requiredRoles={[SELLER]}>
            <SellerMyCourse />
          </ProtectedRoute>
        ),
      },
      {
        path: 'billing',
        element: (
          <ProtectedRoute requiredRoles={[SELLER]}>
            <SellerBilling />
          </ProtectedRoute>
        ),
      },
      {
        path: 'upload-document',
        element: (
          <ProtectedRoute requiredRoles={[SELLER]}>
            <SellerUploadDocument />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
