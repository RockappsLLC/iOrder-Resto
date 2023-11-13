import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { GetTablesResponse, GetTableByIdResponse, CreateTableRequestSchema } from './api-schemas';

// ----------------------------------------------------------------------

export async function createTable(
  data: CreateTableRequestSchema
): Promise<{ data: GetTableByIdResponse }> {
  const URL = endpoints.tables.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetTablesQueryParams {
  restaurantId?: string;
  offset?: number;
  limit?: number;
}

export function useGetTables(params?: IGetTablesQueryParams) {
  const URL = [endpoints.tables.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      tables: (data?.tables as GetTablesResponse['data']) || [],
      tablesLoading: isLoading,
      tablesError: error,
      tablesValidating: isValidating,
      tablesEmpty: !isLoading && !data?.tables.length,
    }),
    [data?.tables, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getTables(params?: IGetTablesQueryParams): Promise<{ data: GetTablesResponse }> {
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

export function getTable(id: string): Promise<{ data: GetTableByIdResponse }> {
  const URL = id ? endpoints.tables.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateTableById(
  id: string,
  data: CreateTableRequestSchema
): Promise<{ data: GetTableByIdResponse }> {
  const URL = endpoints.tables.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteTable(id: string) {
  const URL = endpoints.tables.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
