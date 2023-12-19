import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------
const TablesPage = lazy(() => import('src/pages/dashboard/tables'));

const IndexPage = lazy(() => import('src/pages/dashboard/home'));
const BillsPage = lazy(() => import('src/pages/dashboard/bills'));
const CustomersPage = lazy(() => import('src/pages/dashboard/customers'));
const LockedScreen = lazy(() => import('src/pages/dashboard/locked-screen'));
const OwnerForm = lazy(() => import('src/pages/dashboard/owner-form'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { path: 'tables', element: <TablesPage /> },
      { element: <IndexPage />, index: true },
      { path: 'bills', element: <BillsPage /> },
      { path: 'customers', element: <CustomersPage /> },
    ],
  },
  {
    path: 'other',
    children: [
      { path: 'locked', element: <LockedScreen /> },
      { path: 'owner-form', element: <OwnerForm /> },
    ],
  },
];
