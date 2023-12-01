import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetDevicesResponse,
  DeviceRequestSchema,
  GetDeviceByIdResponse,
  UpdateDeviceRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createDevice(
  data: DeviceRequestSchema
): Promise<{ data: GetDeviceByIdResponse } | ErrorResponse> {
  const URL = endpoints.devices.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetDevicesQueryParams {
  assignToClient?: string;
  offset?: number;
  limit?: number;
}

export function useGetDevices(params?: IGetDevicesQueryParams) {
  const URL = [endpoints.devices.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      devices: (data?.devices as GetDevicesResponse['data']) || [],
      devicesLoading: isLoading,
      devicesError: error,
      devicesValidating: isValidating,
      devicesEmpty: !isLoading && !data?.devices.length,
    }),
    [data?.devices, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getDevices(
  params?: IGetDevicesQueryParams
): Promise<{ data: GetDevicesResponse } | ErrorResponse> {
  const URL = endpoints.devices.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetDevice(id: string) {
  const URL = id ? endpoints.devices.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      device: data as GetDeviceByIdResponse['data'],
      deviceLoading: isLoading,
      deviceError: error,
      deviceValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getDevice(id: string): Promise<{ data: GetDeviceByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.devices.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateDeviceById(
  id: string,
  data: UpdateDeviceRequestSchema
): Promise<{ data: GetDeviceByIdResponse } | ErrorResponse> {
  const URL = endpoints.devices.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteDevice(id: string) {
  const URL = endpoints.devices.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
