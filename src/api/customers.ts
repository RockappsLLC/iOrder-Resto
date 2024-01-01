import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetCustomersResponse,
  GetCustomerByIdResponse,
  CreateCustomerRequestSchema,
  UpdateCustomerRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createCustomer(
  data: CreateCustomerRequestSchema
): Promise<{ data: GetCustomerByIdResponse } | ErrorResponse> {
  const URL = endpoints.customers.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetCustomersQueryParams {
  restaurantId?: string;
  offset?: number;
  limit?: number;
  search?: string;
}

export function useGetCustomers(params?: IGetCustomersQueryParams) {
  const URL = [endpoints.customers.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      customers: (data as GetCustomersResponse['data'])?.customers || [],
      customersLoading: isLoading,
      customersError: error,
      customersValidating: isValidating,
      customersEmpty: !isLoading && !data?.customers.length,
      customersMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getCustomers(
  params?: IGetCustomersQueryParams
): Promise<{ data: GetCustomersResponse } | ErrorResponse> {
  const URL = endpoints.customers.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetCustomer(id: string) {
  const URL = id ? endpoints.customers.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      customer: data as GetCustomerByIdResponse['data'],
      customerLoading: isLoading,
      customerError: error,
      customerValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getCustomer(
  id: string
): Promise<{ data: GetCustomerByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.customers.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateCustomerById(
  id: string,
  data: UpdateCustomerRequestSchema
): Promise<{ data: GetCustomerByIdResponse } | ErrorResponse> {
  const URL = endpoints.customers.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteCustomer(id: string) {
  const URL = endpoints.customers.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
