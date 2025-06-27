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
import SellerMyDocuments from '../pages/seller/my-documents';
import SellerBilling from '../pages/seller/billing';
import ManagerDocuments from '../pages/manager/documents';
import ManagerRevenue from '../pages/manager/revenue';
import CustomerMyDocument from '../pages/customer/my-document';
import SellerCreateDocument from '../pages/seller/create-document';
import CustomerPartner from '../pages/customer/partner';
import SellerHome from '../pages/seller/home';
import CustomerDocumentDetail from '../pages/customer/document-detail';
import CustomerDocumentsAuthor from '../pages/customer/documents-author';
import ManagerDocumentDetail from '../pages/manager/document-detail';
import AdminUsers from '../pages/admin/users';
import PaymentProcess from '../pages/customer/payment-process';
import Chat from '../pages/customer/chat';
import ManagerRefundRequests from '../pages/manager/refunds-requests';
import CustomerRefundsRequests from '../pages/customer/refunds-request';
import SellerRefundsRequest from '../pages/seller/refunds-request';
import CustomerGroup from '../pages/customer/group';
import CustomerMyGroup from '../pages/customer/my-group';
import CustomerGroupDetail from '../pages/customer/group-detail';
import SellerWithdrawals from '../pages/seller/withdrawals';
import ManagerWithdrawals from '../pages/manager/withdrawals';
import CustomerPaymentHistory from '../pages/customer/payment-history';

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
      {
        path: 'payment-process',
        element: <PaymentProcess />,
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
          <ProtectedRoute requiredRoles={[CUSTOMER]}>
            <CustomerHome />
          </ProtectedRoute>
        ),
      },
      {
        path: 'documents',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER]}>
            <CustomerDocuments />
          </ProtectedRoute>
        ),
      },
      {
        path: 'study-plan',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER]}>
            <CustomerStudyPlan />
          </ProtectedRoute>
        ),
      },
      {
        path: 'groups',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER]}>
            <CustomerGroup />
          </ProtectedRoute>
        ),
      },
      {
        path: 'my-groups',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER]}>
            <CustomerMyGroup />
          </ProtectedRoute>
        ),
      },
      {
        path: 'group/:id',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER]}>
            <CustomerGroupDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: 'my-documents',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER]}>
            <CustomerMyDocument />
          </ProtectedRoute>
        ),
      },
      {
        path: 'documents/:id',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER]}>
            <CustomerDocumentDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: 'documents/author/:id',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER]}>
            <CustomerDocumentsAuthor />
          </ProtectedRoute>
        ),
      },
      {
        path: 'partners',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER]}>
            <CustomerPartner />
          </ProtectedRoute>
        ),
      },
      {
        path: 'refunds-requests',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER]}>
            <CustomerRefundsRequests />
          </ProtectedRoute>
        ),
      },
      {
        path: 'chat',
        element: <Chat />,
      },
      {
        path: 'payment-history',
        element: (
          <ProtectedRoute requiredRoles={[CUSTOMER]}>
            <CustomerPaymentHistory />
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
        path: '',
        element: (
          <ProtectedRoute requiredRoles={[ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute requiredRoles={[ADMIN]}>
            <AdminUsers />
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
        path: '',
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
        path: 'documents/:id',
        element: (
          <ProtectedRoute requiredRoles={[MANAGER]}>
            <ManagerDocumentDetail />
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
      {
        path: 'refunds-requests',
        element: (
          <ProtectedRoute requiredRoles={[MANAGER]}>
            <ManagerRefundRequests />
          </ProtectedRoute>
        ),
      },
      {
        path: 'withdrawals',
        element: (
          <ProtectedRoute requiredRoles={[MANAGER]}>
            <ManagerWithdrawals />
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
        path: '',
        element: (
          <ProtectedRoute requiredRoles={[SELLER]}>
            <SellerHome />
          </ProtectedRoute>
        ),
      },
      {
        path: 'my-documents',
        element: (
          <ProtectedRoute requiredRoles={[SELLER]}>
            <SellerMyDocuments />
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
        path: 'create-documents',
        element: (
          <ProtectedRoute requiredRoles={[SELLER]}>
            <SellerCreateDocument />
          </ProtectedRoute>
        ),
      },
      {
        path: 'refunds-requests',
        element: (
          <ProtectedRoute requiredRoles={[SELLER]}>
            <SellerRefundsRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: 'withdrawals',
        element: (
          <ProtectedRoute requiredRoles={[SELLER]}>
            <SellerWithdrawals />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
