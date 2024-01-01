import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { ErrorResponse, PaymentRequestSchema, GetPaymentByIdResponse } from './api-schemas';

// ----------------------------------------------------------------------

export async function createPayment(
  data: PaymentRequestSchema
): Promise<{ data: GetPaymentByIdResponse } | ErrorResponse> {
  const URL = endpoints.payments.post;
  return axios.post(URL, data);
}

// ----------------------------------------------------------------------

export function useGetTransactions(id: string) {
  const URL = id ? endpoints.payments.transactions.getById.replace('{id}', id) : '';
  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      paymentsTransaction: data as GetPaymentByIdResponse['data'],
      paymentsTransactionLoading: isLoading,
      paymentsTransactionError: error,
      paymentsTransactionValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getTransactions(
  id: string
): Promise<{ data: GetPaymentByIdResponse } | ErrorResponse> {
  const URL = id ? endpoints.payments.transactions.getById.replace('{id}', id) : '';
  return axios.get(URL);
}

// ----------------------------------------------------------------------
