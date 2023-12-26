import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import {
  ErrorResponse,
  GetTasksResponse,
  GetTaskByIdResponse,
  CreateTaskRequestSchema,
} from './api-schemas';

// ----------------------------------------------------------------------

export async function createTask(
  data: CreateTaskRequestSchema
): Promise<{ data: GetTaskByIdResponse } | ErrorResponse> {
  const URL = endpoints.tasks.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------
interface IGetTasksQueryParams {
  offset?: number;
  limit?: number;
}

export function useGetTasks(params?: IGetTasksQueryParams) {
  const URL = [endpoints.tasks.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      tasks: (data as GetTasksResponse['data'])?.tasks || [],
      tasksLoading: isLoading,
      tasksError: error,
      tasksValidating: isValidating,
      tasksEmpty: !isLoading && !data?.tasks.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getTasks(
  params?: IGetTasksQueryParams
): Promise<{ data: GetTasksResponse } | ErrorResponse> {
  const URL = endpoints.tasks.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetTask(id: string) {
  const URL = id ? endpoints.tasks.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      task: data as GetTaskByIdResponse['data'],
      taskLoading: isLoading,
      taskError: error,
      taskValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getTask(id: string): Promise<{ data: GetTaskByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.tasks.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------

export async function updateTaskById(
  id: string,
  data: CreateTaskRequestSchema
): Promise<{ data: GetTaskByIdResponse } | ErrorResponse> {
  const URL = endpoints.tasks.put.replace('{id}', id);
  return axios.put(URL, data);
}

// ----------------------------------------------------------------------
export async function deleteTask(id: string) {
  const URL = endpoints.tasks.delete.replace('{id}', id);
  return axios.delete(URL);
}

// ----------------------------------------------------------------------
