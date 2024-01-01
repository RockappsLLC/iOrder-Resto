import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetPricingPlansResponse,
  GetPricingPlanByIdResponse,
  CreatePricingPlanRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createPricingPlan(
  data: CreatePricingPlanRequestSchema
): Promise<{ data: GetPricingPlanByIdResponse } | ErrorResponse> {
  const URL = endpoints.pricingPlans.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetPricingPlansQueryParams {
  offset?: number;
  limit?: number;
}

export function useGetPricingPlans(params?: IGetPricingPlansQueryParams) {
  const URL = [endpoints.pricingPlans.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      pricingPlans: (data as GetPricingPlansResponse['data'])?.pricingPlans || [],
      pricingPlansLoading: isLoading,
      pricingPlansError: error,
      pricingPlansValidating: isValidating,
      pricingPlansEmpty: !isLoading && !data?.pricingPlans.length,
      pricingPlansMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getPricingPlans(
  params?: IGetPricingPlansQueryParams
): Promise<{ data: GetPricingPlansResponse } | ErrorResponse> {
  const URL = endpoints.pricingPlans.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetPricingPlan(id: string) {
  const URL = id ? endpoints.pricingPlans.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      pricingPlan: data as GetPricingPlanByIdResponse['data'],
      pricingPlanLoading: isLoading,
      pricingPlanError: error,
      pricingPlanValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getPricingPlan(
  id: string
): Promise<{ data: GetPricingPlanByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.pricingPlans.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updatePricingPlanById(
  id: string,
  data: CreatePricingPlanRequestSchema
): Promise<{ data: GetPricingPlanByIdResponse } | ErrorResponse> {
  const URL = endpoints.pricingPlans.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deletePricingPlan(id: string) {
  const URL = endpoints.pricingPlans.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
