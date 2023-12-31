import { useMemo, useEffect, useReducer, useCallback } from 'react';

import { postLogin } from 'src/api/auth';
import { getMe, createUser } from 'src/api/users';
import { CreateUserRequestSchema } from 'src/api/api-schemas';

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              displayName: '',
              photoURL: '',
              // ...profile,
              // displayName: [profile?.firstName || '', profile?.lastName || ''].join(' '),
              // photoURL: '',
              accessToken,
            },
          },
        });

        const response = await getMe();

        const { data: profile } = response.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...profile,
              displayName: [profile?.firstName || '', profile?.lastName || ''].join(' '),
              photoURL: '',
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password,
    };

    const res = await postLogin(data);

    const {
      data: { token: accessToken, userData: profile },
    } = res.data || {};

    if (accessToken) await setSession(accessToken);

    // const response = await getMe();

    // const { data: profile } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('restaurantId', profile?.restaurantId);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...profile,
          displayName: [profile?.firstName || '', profile?.lastName || ''].join(' '),
          photoURL: '',
          accessToken,
        },
      },
    });
  }, []);

  // LOGIN WITH PIN
  const loginWithPin = useCallback(async (email: string, pin: any) => {
    const data = {
      email,
      pin,
    };

    const res = await postLogin(data);

    const {
      data: { token: accessToken, userData: profile },
    } = res.data || {};

    if (accessToken) {
      await setSession(accessToken);

      // const response = await getMe();
      // const { data: profile } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('restaurantId', profile?.restaurantId || '');

      dispatch({
        type: Types.LOGIN,
        payload: {
          user: {
            ...profile,
            displayName: [profile?.firstName || '', profile?.lastName || ''].join(' '),
            photoURL: '',
            accessToken,
          },
        },
      });
    }
  }, []);

  // REGISTER
  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      restaurantId: string,
      role: CreateUserRequestSchema['role']
    ) => {
      const data = {
        email,
        password,
        firstName,
        lastName,
        restaurantId,
        role,
      };

      const {
        data: { data: user },
      } = await createUser(data);

      const {
        data: { data: accessToken },
      } = await postLogin(data);

      if (accessToken) {
        await setSession(accessToken);
        sessionStorage.setItem(STORAGE_KEY, accessToken);
        dispatch({
          type: Types.REGISTER,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      }
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      loginWithPin,
      register,
      logout,
    }),
    [login, loginWithPin, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
