import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetMenuItemsResponse,
  GetMenuItemByIdResponse,
  CreateMenuItemRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createMenuItem(
  data: CreateMenuItemRequestSchema
): Promise<{ data: GetMenuItemByIdResponse } | ErrorResponse> {
  const URL = endpoints.menuItems.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetMenuItemsQueryParams {
  restaurantId?: string;
  offset?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
}

export function useGetMenuItems(params?: IGetMenuItemsQueryParams) {
  const URL = [endpoints.menuItems.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      menuItems: (data as GetMenuItemsResponse['data'])?.menuItems || [],
      menuItemsLoading: isLoading,
      menuItemsError: error,
      menuItemsValidating: isValidating,
      menuItemsEmpty: !isLoading && !data?.menuItems.length,
      totalLength: data?.totalLength,
      menuItemsMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getMenuItems(
  params?: IGetMenuItemsQueryParams
): Promise<{ data: GetMenuItemsResponse } | ErrorResponse> {
  const URL = endpoints.menuItems.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetMenuItem(id: string) {
  const URL = id ? endpoints.menuItems.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      menuItem: data as GetMenuItemByIdResponse['data'],
      menuItemLoading: isLoading,
      menuItemError: error,
      menuItemValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getMenuItem(
  id: string
): Promise<{ data: GetMenuItemByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.menuItems.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateMenuItemById(
  id: string,
  data: CreateMenuItemRequestSchema
): Promise<{ data: GetMenuItemByIdResponse } | ErrorResponse> {
  const URL = endpoints.menuItems.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteMenuItem(id: string) {
  const URL = endpoints.menuItems.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
