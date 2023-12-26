import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetAppointmentsResponse,
  GetAppointmentByIdResponse,
  CreateAppointmentRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createAppointment(
  data: CreateAppointmentRequestSchema
): Promise<{ data: GetAppointmentByIdResponse } | ErrorResponse> {
  const URL = endpoints.appointments.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetAppointmentsQueryParams {
  offset?: number;
  limit?: number;
  search?: string;
}

export function useGetAppointments(params?: IGetAppointmentsQueryParams) {
  const URL = [endpoints.appointments.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      appointments: (data as GetAppointmentsResponse['data'])?.appointments || [],
      appointmentsLoading: isLoading,
      appointmentsError: error,
      appointmentsValidating: isValidating,
      appointmentsEmpty: !isLoading && !data?.appointments.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getAppointments(
  params?: IGetAppointmentsQueryParams
): Promise<{ data: GetAppointmentsResponse } | ErrorResponse> {
  const URL = endpoints.appointments.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetAppointment(id: string) {
  const URL = id ? endpoints.appointments.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      appointment: data as GetAppointmentByIdResponse['data'],
      appointmentLoading: isLoading,
      appointmentError: error,
      appointmentValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getAppointment(
  id: string
): Promise<{ data: GetAppointmentByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.appointments.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateAppointmentById(
  id: string,
  data: CreateAppointmentRequestSchema
): Promise<{ data: GetAppointmentByIdResponse } | ErrorResponse> {
  const URL = endpoints.appointments.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteAppointment(id: string) {
  const URL = endpoints.appointments.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
