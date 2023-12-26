import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetReservationsResponse,
  GetReservationByIdResponse,
  CreateReservationRequestSchema,
  UpdateReservationRequestSchema,
  CreateReservationResponseSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createReservation(
  data: CreateReservationRequestSchema
): Promise<{ data: CreateReservationResponseSchema } | ErrorResponse> {
  const URL = endpoints.reservations.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetReservationsQueryParams {
  restaurantId?: string;
  offset?: number;
  limit?: number;
}

export function useGetReservations(params?: IGetReservationsQueryParams) {
  const URL = [endpoints.reservations.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      reservations: (data as GetReservationsResponse['data'])?.reservations || [],
      reservationsLoading: isLoading,
      reservationsError: error,
      reservationsValidating: isValidating,
      reservationsEmpty: !isLoading && !data?.reservations.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getReservations(
  params?: IGetReservationsQueryParams
): Promise<{ data: GetReservationsResponse } | ErrorResponse> {
  const URL = endpoints.reservations.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetReservation(id: string) {
  const URL = id ? endpoints.reservations.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      reservation: data as GetReservationByIdResponse['data'],
      reservationLoading: isLoading,
      reservationError: error,
      reservationValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getReservation(
  id: string
): Promise<{ data: GetReservationByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.reservations.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateReservationById(
  id: string,
  data: UpdateReservationRequestSchema
): Promise<{ data: GetReservationByIdResponse } | ErrorResponse> {
  const URL = endpoints.reservations.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteReservation(id: string) {
  const URL = endpoints.reservations.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
