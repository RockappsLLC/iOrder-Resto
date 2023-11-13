import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  GetMenuItemsResponse,
  GetMenuItemByIdResponse,
  CreateMenuItemRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createMenuItem(
  data: CreateMenuItemRequestSchema
): Promise<{ data: GetMenuItemByIdResponse }> {
  const URL = endpoints.menuItems.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetMenuItemsQueryParams {
  restaurantId?: string;
  offset?: number;
  limit?: number;
}

export function useGetMenuItems(params?: IGetMenuItemsQueryParams) {
  const URL = [endpoints.menuItems.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      menuItems: (data?.menuItems as GetMenuItemsResponse['data']) || [],
      menuItemsLoading: isLoading,
      menuItemsError: error,
      menuItemsValidating: isValidating,
      menuItemsEmpty: !isLoading && !data?.menuItems.length,
    }),
    [data?.menuItems, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getMenuItems(
  params?: IGetMenuItemsQueryParams
): Promise<{ data: GetMenuItemsResponse }> {
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

export function getMenuItem(id: string): Promise<{ data: GetMenuItemByIdResponse }> {
  const URL = id ? endpoints.menuItems.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateMenuItemById(
  id: string,
  data: CreateMenuItemRequestSchema
): Promise<{ data: GetMenuItemByIdResponse }> {
  const URL = endpoints.menuItems.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteMenuItem(id: string) {
  const URL = endpoints.menuItems.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
