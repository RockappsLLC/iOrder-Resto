import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { ErrorResponse, GetTransactionsResponse, GetTransactionByIdResponse } from './api-schemas';

// ----------------------------------------------------------------------
interface IGetTransactionsQueryParams {
  restaurantId: string;
  offset?: number;
  limit?: number;
}

export function useGetTransactions(params: IGetTransactionsQueryParams) {
  const URL = [endpoints.transactions.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      transactions: (data as GetTransactionsResponse['data'])?.transactions || [],
      transactionsLoading: isLoading,
      transactionsError: error,
      transactionsValidating: isValidating,
      transactionsEmpty: !isLoading && !data?.transactions.length,
      transactionsMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getTransactions(
  params: IGetTransactionsQueryParams
): Promise<{ data: GetTransactionsResponse } | ErrorResponse> {
  const URL = endpoints.transactions.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------

export function useGetTransaction(id: string) {
  const URL = id ? endpoints.transactions.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      transaction: data as GetTransactionByIdResponse['data'],
      transactionLoading: isLoading,
      transactionError: error,
      transactionValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getTransaction(
  id: string
): Promise<{ data: GetTransactionByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.transactions.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------
