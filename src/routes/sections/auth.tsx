import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import PinScreen from 'src/pages/auth/other/PinScreen';
import LockedScreen from 'src/pages/auth/other/LockedScreen';
import OwnerForm from 'src/pages/auth/other/owner-login/OwnerForm';
import LoginOwner from 'src/pages/auth/other/owner-login/LoginOwner';
import ChooseUserScreen from 'src/pages/auth/other/ChooseUserScreen';
import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));

// ----------------------------------------------------------------------

const authJwt = {
  path: 'jwt',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        // <AuthModernCompactLayout>
        <JwtLoginPage />
        // </AuthModernCompactLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthModernCompactLayout>
          <JwtRegisterPage />
        </AuthModernCompactLayout>
      ),
    },
  ],
};

const authOther = {
  path: 'other',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'choose-user',
      element: <ChooseUserScreen />,
    },
    {
      path: 'pin-screen',
      element: <PinScreen />,
    },
    {
      path: 'lock-screen',
      element: <LockedScreen />,
    },
    {
      path: 'login-owner',
      element: <LoginOwner />,
    },
    {
      path: 'owner-form',
      element: <OwnerForm />,
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authJwt],
  },
  {
    path: 'auth',
    children: [authOther],
  },
];
