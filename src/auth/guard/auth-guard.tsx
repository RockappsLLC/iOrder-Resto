import React, { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

const loginPaths: Record<string, string> = {
  jwt: paths.auth.jwt.login,
};

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { loading } = useAuthContext();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const restaurantIdStorage = localStorage.getItem('restaurantId');
  const accessToken = localStorage.getItem('accessToken');

  const checkAuthentication = useCallback(() => {
    if (accessToken && restaurantIdStorage) {
      router.replace('/dashboard');
    } else if (!accessToken && !restaurantIdStorage) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();
      const loginPath = loginPaths.jwt;
      const href = `${loginPath}?${searchParams}`;
      router.replace(href);
    } else if (restaurantIdStorage) {
      router.replace('/auth/other/pin-screen');
    }
    setChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (loading || !checked) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
