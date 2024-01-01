import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { ErrorResponse, GetStatisticsResponse } from './api-schemas';

// ----------------------------------------------------------------------
interface IGetStatisticsQueryParams {
  year?: number;
}

export function useGetStatistics(params?: IGetStatisticsQueryParams) {
  const URL = [endpoints.statistics.get, { params }];

  const { data: { data } = {}, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      statistics: (data as GetStatisticsResponse['data']) || [],
      statisticsLoading: isLoading,
      statisticsError: error,
      statisticsValidating: isValidating,
      statisticsEmpty: !isLoading && !data?.statistics.length,
      statisticsMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getStatistics(
  params?: IGetStatisticsQueryParams
): Promise<{ data: GetStatisticsResponse } | ErrorResponse> {
  const URL = endpoints.statistics.get;
  return axios.get(URL, { params });
}

// ----------------------------------------------------------------------
