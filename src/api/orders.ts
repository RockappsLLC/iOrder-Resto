import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  GetOrdersResponse,
  OrderRequestSchema,
  GetOrderByIdResponse,
  UpdateOrderRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createOrder(
  data: OrderRequestSchema
): Promise<{ data: GetOrderByIdResponse }> {
  const URL = endpoints.orders.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetOrdersQueryParams {
  restaurantId?: string;
  offset?: number;
  limit?: number;
}

export function useGetOrders(params?: IGetOrdersQueryParams) {
  const URL = [endpoints.orders.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      orders: (data?.orders as GetOrdersResponse['data']) || [],
      ordersLoading: isLoading,
      ordersError: error,
      ordersValidating: isValidating,
      ordersEmpty: !isLoading && !data?.orders.length,
    }),
    [data?.orders, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getOrders(params?: IGetOrdersQueryParams): Promise<{ data: GetOrdersResponse }> {
  const URL = endpoints.orders.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetOrder(id: string) {
  const URL = id ? endpoints.orders.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      order: data as GetOrderByIdResponse['data'],
      orderLoading: isLoading,
      orderError: error,
      orderValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getOrder(id: string): Promise<{ data: GetOrderByIdResponse }> {
  const URL = id ? endpoints.orders.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateOrderById(
  id: string,
  data: UpdateOrderRequestSchema
): Promise<{ data: GetOrderByIdResponse }> {
  const URL = endpoints.orders.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteOrder(id: string) {
  const URL = endpoints.orders.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
