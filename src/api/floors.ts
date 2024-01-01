import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetFloorsResponse,
  FloorRequestSchema,
  GetFloorByIdResponse,
  UpdateFloorRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createFloor(
  data: FloorRequestSchema
): Promise<{ data: GetFloorByIdResponse } | ErrorResponse> {
  const URL = endpoints.floors.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetFloorsQueryParams {
  restaurantId: string;
  offset?: number;
  limit?: number;
}

export function useGetFloors(params: IGetFloorsQueryParams) {
  const URL = [endpoints.floors.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      floors: (data as GetFloorsResponse['data'])?.floors || [],
      floorsLoading: isLoading,
      floorsError: error,
      floorsValidating: isValidating,
      floorsEmpty: !isLoading && !data?.floors.length,
      floorsMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getFloors(
  params: IGetFloorsQueryParams
): Promise<{ data: GetFloorsResponse } | ErrorResponse> {
  const URL = endpoints.floors.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetFloor(id: string) {
  const URL = id ? endpoints.floors.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      floor: data as GetFloorByIdResponse['data'],
      floorLoading: isLoading,
      floorError: error,
      floorValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getFloor(id: string): Promise<{ data: GetFloorByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.floors.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateFloorById(
  id: string,
  data: UpdateFloorRequestSchema
): Promise<{ data: GetFloorByIdResponse } | ErrorResponse> {
  const URL = endpoints.floors.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteFloor(id: string) {
  const URL = endpoints.floors.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
