import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    // if (error.response.s)
    console.log();
    if (error.response.status === 401) {
      // setSession(null);
      // localStorage.removeItem('accessToken');
      // const restaurantId = await localStorage.getItem('restaurantId');
      // if (restaurantId) {
      //   window.location.href = '/other/locked';
      // } else {
      //   window.location.href = '/auth/jwt/login';
      // }
    }
    Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher: any = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------
export const endpoints = {
  auth: {
    login: { post: '/auth/login' },
    forgotPassword: { post: '/auth/forgot-password' },
    resetPassword: { post: '/auth/reset-password' },
  },
  users: {
    post: '/users',
    get: '/users',
    me: { get: '/users/me' },
    getById: '/users/{id}',
    put: '/users/{id}',
    delete: '/users/{id}',
  },
  categories: {
    post: '/categories',
    get: '/categories',
    getById: '/categories/{id}',
    put: '/categories/{id}',
    delete: '/categories/{id}',
  },
  restaurants: {
    post: '/restaurants',
    get: '/restaurants',
    getById: '/restaurants/{id}',
    put: '/restaurants/{id}',
    delete: '/restaurants/{id}',
  },
  menuCategories: {
    post: '/menu-categories',
    get: '/menu-categories',
    getById: '/menu-categories/{id}',
    put: '/menu-categories/{id}',
    delete: '/menu-categories/{id}',
  },
  menuItems: {
    post: '/menu-items',
    get: '/menu-items',
    getById: '/menu-items/{id}',
    put: '/menu-items/{id}',
    delete: '/menu-items/{id}',
  },
  tables: {
    post: '/tables',
    get: '/tables',
    getById: '/tables/{id}',
    put: '/tables/{id}',
    delete: '/tables/{id}',
  },
  customers: {
    post: '/customers',
    get: '/customers',
    getById: '/customers/{id}',
    put: '/customers/{id}',
    delete: '/customers/{id}',
  },
  reservations: {
    post: '/reservations',
    get: '/reservations',
    getById: '/reservations/{id}',
    put: '/reservations/{id}',
    delete: '/reservations/{id}',
  },
  devices: {
    post: '/devices',
    get: '/devices',
    getById: '/devices/{id}',
    put: '/devices/{id}',
    delete: '/devices/{id}',
  },
  tasks: {
    post: '/tasks',
    get: '/tasks',
    getById: '/tasks/{id}',
    put: '/tasks/{id}',
    delete: '/tasks/{id}',
  },
  leads: {
    post: '/leads',
    get: '/leads',
    getById: '/leads/{id}',
    put: '/leads/{id}',
    delete: '/leads/{id}',
  },
  appointments: {
    post: '/appointments',
    get: '/appointments',
    getById: '/appointments/{id}',
    put: '/appointments/{id}',
    delete: '/appointments/{id}',
  },
  pricingPlans: {
    post: '/pricing-plans',
    get: '/pricing-plans',
    getById: '/pricing-plans/{id}',
    put: '/pricing-plans/{id}',
    delete: '/pricing-plans/{id}',
  },
  orders: {
    post: '/orders',
    get: '/orders',
    getById: '/orders/{id}',
    put: '/orders/{id}',
    delete: '/orders/{id}',
  },
  invoices: {
    post: '/invoices',
    get: '/invoices',
    getById: '/invoices/{id}',
    put: '/invoices/{id}',
    delete: '/invoices/{id}',
  },
  statistics: { get: '/statistics' },
  payments: {
    post: '/payments',
    transactions: { getById: '/payments/transactions/{transactionId}' },
  },
  files: { upload: { post: '/files/upload' } },
};
