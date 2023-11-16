import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetUsersResponse,
  GetUserByIdResponse,
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createUser(
  data: CreateUserRequestSchema
): Promise<{ data: GetUserByIdResponse } | ErrorResponse> {
  const URL = endpoints.users.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetUsersQueryParams {
  restaurantId?: string;
  offset?: number;
  limit?: number;
}

export function useGetUsers(params?: IGetUsersQueryParams) {
  const URL = [endpoints.users.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      users: (data?.users as GetUsersResponse['data']) || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.users.length,
    }),
    [data?.users, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getUsers(
  params?: IGetUsersQueryParams
): Promise<{ data: GetUsersResponse } | ErrorResponse> {
  const URL = endpoints.users.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetMe() {
  const URL = endpoints.users.me.get;
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      usersMe: data as GetUserByIdResponse['data'],
      usersMeLoading: isLoading,
      usersMeError: error,
      usersMeValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getMe(): Promise<{ data: GetUserByIdResponse } | ErrorResponse> {
  const URL = endpoints.users.me.get;
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export function useGetUser(id: string) {
  const URL = id ? endpoints.users.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      user: data as GetUserByIdResponse['data'],
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getUser(id: string): Promise<{ data: GetUserByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.users.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateUserById(
  id: string,
  data: UpdateUserRequestSchema
): Promise<{ data: GetUserByIdResponse } | ErrorResponse> {
  const URL = endpoints.users.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteUser(id: string) {
  const URL = endpoints.users.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
