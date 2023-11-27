import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetRestaurantsResponse,
  GetRestaurantByIdResponse,
  CreateRestaurantRequestSchema,
  UpdateRestaurantRequestSchema,
  CreateRestaurantResponseSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createRestaurant(
  data: CreateRestaurantRequestSchema
): Promise<{ data: CreateRestaurantResponseSchema } | ErrorResponse> {
  const URL = endpoints.restaurants.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetRestaurantsQueryParams {
  offset?: number;
  limit?: number;
  search?: string;
}

export function useGetRestaurants(params?: IGetRestaurantsQueryParams) {
  const URL = [endpoints.restaurants.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      restaurants: (data?.restaurants as GetRestaurantsResponse['data']) || [],
      restaurantsLoading: isLoading,
      restaurantsError: error,
      restaurantsValidating: isValidating,
      restaurantsEmpty: !isLoading && !data?.restaurants.length,
    }),
    [data?.restaurants, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getRestaurants(
  params?: IGetRestaurantsQueryParams
): Promise<{ data: GetRestaurantsResponse } | ErrorResponse> {
  const URL = endpoints.restaurants.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetRestaurant(id: string) {
  const URL = id ? endpoints.restaurants.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      restaurant: data as GetRestaurantByIdResponse['data'],
      restaurantLoading: isLoading,
      restaurantError: error,
      restaurantValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getRestaurant(
  id: string
): Promise<{ data: GetRestaurantByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.restaurants.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateRestaurantById(
  id: string,
  data: UpdateRestaurantRequestSchema
): Promise<{ data: GetRestaurantByIdResponse } | ErrorResponse> {
  const URL = endpoints.restaurants.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteRestaurant(id: string) {
  const URL = endpoints.restaurants.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
