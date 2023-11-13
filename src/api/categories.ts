import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  GetCategoriesResponse,
  GetCategoryByIdResponse,
  CreateCategoryRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createCategory(
  data: CreateCategoryRequestSchema
): Promise<{ data: GetCategoryByIdResponse }> {
  const URL = endpoints.categories.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetCategoriesQueryParams {
  offset?: number;
  limit?: number;
}

export function useGetCategories(params?: IGetCategoriesQueryParams) {
  const URL = [endpoints.categories.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      categories: (data?.categories as GetCategoriesResponse['data']) || [],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesValidating: isValidating,
      categoriesEmpty: !isLoading && !data?.categories.length,
    }),
    [data?.categories, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getCategories(
  params?: IGetCategoriesQueryParams
): Promise<{ data: GetCategoriesResponse }> {
  const URL = endpoints.categories.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetCategory(id: string) {
  const URL = id ? endpoints.categories.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      category: data as GetCategoryByIdResponse['data'],
      categoryLoading: isLoading,
      categoryError: error,
      categoryValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getCategory(id: string): Promise<{ data: GetCategoryByIdResponse }> {
  const URL = id ? endpoints.categories.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateCategoryById(
  id: string,
  data: CreateCategoryRequestSchema
): Promise<{ data: GetCategoryByIdResponse }> {
  const URL = endpoints.categories.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteCategory(id: string) {
  const URL = endpoints.categories.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
