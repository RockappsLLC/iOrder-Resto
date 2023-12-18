import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetTablesResponse,
  GetTableByIdResponse,
  CreateTableRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createTable(
  data: CreateTableRequestSchema
): Promise<{ data: GetTableByIdResponse } | ErrorResponse> {
  const URL = endpoints.tables.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetTablesQueryParams {
  restaurantId?: string;
  offset?: number;
  limit?: number;
  search?: string;
}

export function useGetTables(params?: IGetTablesQueryParams) {
  const URL = [endpoints.tables.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);
  console.log(data);
  const memoizedValue = useMemo(
    () => ({
      tables: (data as GetTablesResponse['data'])?.tables || [],
      tablesLoading: isLoading,
      tablesError: error,
      tablesValidating: isValidating,
      tablesEmpty: !isLoading && !data?.tables.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getTables(
  params?: IGetTablesQueryParams
): Promise<{ data: GetTablesResponse } | ErrorResponse> {
  const URL = endpoints.tables.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetTable(id: string) {
  const URL = id ? endpoints.tables.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      table: data as GetTableByIdResponse['data'],
      tableLoading: isLoading,
      tableError: error,
      tableValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getTable(id: string): Promise<{ data: GetTableByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.tables.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateTableById(
  id: string,
  data: CreateTableRequestSchema
): Promise<{ data: GetTableByIdResponse } | ErrorResponse> {
  const URL = endpoints.tables.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteTable(id: string) {
  const URL = endpoints.tables.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
