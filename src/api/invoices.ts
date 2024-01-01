import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetInvoicesResponse,
  GetInvoiceByIdResponse,
  CreateInvoiceRequestSchema,
  UpdateInvoiceRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createInvoice(
  data: CreateInvoiceRequestSchema
): Promise<{ data: GetInvoiceByIdResponse } | ErrorResponse> {
  const URL = endpoints.invoices.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetInvoicesQueryParams {
  offset?: number;
  limit?: number;
}

export function useGetInvoices(params?: IGetInvoicesQueryParams) {
  const URL = [endpoints.invoices.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      invoices: (data as GetInvoicesResponse['data'])?.invoices || [],
      invoicesLoading: isLoading,
      invoicesError: error,
      invoicesValidating: isValidating,
      invoicesEmpty: !isLoading && !data?.invoices.length,
      invoicesMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getInvoices(
  params?: IGetInvoicesQueryParams
): Promise<{ data: GetInvoicesResponse } | ErrorResponse> {
  const URL = endpoints.invoices.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetInvoice(id: string) {
  const URL = id ? endpoints.invoices.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      invoice: data as GetInvoiceByIdResponse['data'],
      invoiceLoading: isLoading,
      invoiceError: error,
      invoiceValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getInvoice(id: string): Promise<{ data: GetInvoiceByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.invoices.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateInvoiceById(
  id: string,
  data: UpdateInvoiceRequestSchema
): Promise<{ data: GetInvoiceByIdResponse } | ErrorResponse> {
  const URL = endpoints.invoices.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteInvoice(id: string) {
  const URL = endpoints.invoices.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
