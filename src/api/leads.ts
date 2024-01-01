import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetLeadsResponse,
  GetLeadByIdResponse,
  CreateLeadRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createLead(
  data: CreateLeadRequestSchema
): Promise<{ data: GetLeadByIdResponse } | ErrorResponse> {
  const URL = endpoints.leads.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetLeadsQueryParams {
  offset?: number;
  limit?: number;
  search?: string;
}

export function useGetLeads(params?: IGetLeadsQueryParams) {
  const URL = [endpoints.leads.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      leads: (data as GetLeadsResponse['data'])?.leads || [],
      leadsLoading: isLoading,
      leadsError: error,
      leadsValidating: isValidating,
      leadsEmpty: !isLoading && !data?.leads.length,
      leadsMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getLeads(
  params?: IGetLeadsQueryParams
): Promise<{ data: GetLeadsResponse } | ErrorResponse> {
  const URL = endpoints.leads.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetLead(id: string) {
  const URL = id ? endpoints.leads.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      lead: data as GetLeadByIdResponse['data'],
      leadLoading: isLoading,
      leadError: error,
      leadValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getLead(id: string): Promise<{ data: GetLeadByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.leads.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateLeadById(
  id: string,
  data: CreateLeadRequestSchema
): Promise<{ data: GetLeadByIdResponse } | ErrorResponse> {
  const URL = endpoints.leads.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteLead(id: string) {
  const URL = endpoints.leads.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
