import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProductUploadPage from './pages/ProductUploadPage';
import StorefrontPage from './pages/StorefrontPage';
import DashboardPage from './pages/DashboardPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  /** Accessible without login. Routes without this flag require authentication. Has no effect when RouteGuard is not in use. */
  public?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Landing',
    path: '/',
    element: <LandingPage />,
    public: true,
  },
  {
    name: 'Login',
    path: '/login',
    element: <LoginPage />,
    public: true,
  },
  {
    name: 'Storefront',
    path: '/storefront',
    element: <StorefrontPage />,
    public: true,
  },
  {
    name: 'Product Upload',
    path: '/upload',
    element: <ProductUploadPage />,
    public: false,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <DashboardPage />,
    public: false,
  },
  {
    name: 'Payment Success',
    path: '/payment-success',
    element: <PaymentSuccessPage />,
    public: true,
  },
];

export default routes;
