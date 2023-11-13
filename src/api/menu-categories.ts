import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  GetMenuCategoriesResponse,
  GetMenuCategoryByIdResponse,
  CreateMenuCategoryRequestSchema,
  UpdateMenuCategoryRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createMenuCategory(
  data: CreateMenuCategoryRequestSchema
): Promise<{ data: GetMenuCategoryByIdResponse }> {
  const URL = endpoints.menuCategories.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetMenuCategoriesQueryParams {
  restaurantId?: string;
  offset?: number;
  limit?: number;
}

export function useGetMenuCategories(params?: IGetMenuCategoriesQueryParams) {
  const URL = [endpoints.menuCategories.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      menuCategories: (data?.menuCategories as GetMenuCategoriesResponse['data']) || [],
      menuCategoriesLoading: isLoading,
      menuCategoriesError: error,
      menuCategoriesValidating: isValidating,
      menuCategoriesEmpty: !isLoading && !data?.menuCategories.length,
    }),
    [data?.menuCategories, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getMenuCategories(
  params?: IGetMenuCategoriesQueryParams
): Promise<{ data: GetMenuCategoriesResponse }> {
  const URL = endpoints.menuCategories.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetMenuCategory(id: string) {
  const URL = id ? endpoints.menuCategories.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      menuCategorie: data as GetMenuCategoryByIdResponse['data'],
      menuCategorieLoading: isLoading,
      menuCategorieError: error,
      menuCategorieValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getMenuCategory(id: string): Promise<{ data: GetMenuCategoryByIdResponse }> {
  const URL = id ? endpoints.menuCategories.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateMenuCategoryById(
  id: string,
  data: UpdateMenuCategoryRequestSchema
): Promise<{ data: GetMenuCategoryByIdResponse }> {
  const URL = endpoints.menuCategories.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteMenuCategory(id: string) {
  const URL = endpoints.menuCategories.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
