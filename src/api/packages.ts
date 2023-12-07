import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetPackagesResponse,
  GetPackageByIdResponse,
  CreatePackageRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createPackage(
  data: CreatePackageRequestSchema
): Promise<{ data: GetPackageByIdResponse } | ErrorResponse> {
  const URL = endpoints.packages.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetPackagesQueryParams {
  offset?: number;
  limit?: number;
}

export function useGetPackages(params?: IGetPackagesQueryParams) {
  const URL = [endpoints.packages.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      packages: (data as GetPackagesResponse['data'])?.packages || [],
      packagesLoading: isLoading,
      packagesError: error,
      packagesValidating: isValidating,
      packagesEmpty: !isLoading && !data?.packages.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getPackages(
  params?: IGetPackagesQueryParams
): Promise<{ data: GetPackagesResponse } | ErrorResponse> {
  const URL = endpoints.packages.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetPackage(id: string) {
  const URL = id ? endpoints.packages.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      package: data as GetPackageByIdResponse['data'],
      packageLoading: isLoading,
      packageError: error,
      packageValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getPackage(id: string): Promise<{ data: GetPackageByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.packages.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updatePackageById(
  id: string,
  data: CreatePackageRequestSchema
): Promise<{ data: GetPackageByIdResponse } | ErrorResponse> {
  const URL = endpoints.packages.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deletePackage(id: string) {
  const URL = endpoints.packages.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
