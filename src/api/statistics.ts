import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { ErrorResponse, GetStatisticsResponse } from './api-schemas';

// ----------------------------------------------------------------------

export function useGetStatistics() {
  const URL = endpoints.statistics.get;

  const { data: { data } = {}, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      statistics: (data?.statistics as GetStatisticsResponse['data']) || [],
      statisticsLoading: isLoading,
      statisticsError: error,
      statisticsValidating: isValidating,
      statisticsEmpty: !isLoading && !data?.statistics.length,
    }),
    [data?.statistics, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function getStatistics(): Promise<{ data: GetStatisticsResponse } | ErrorResponse> {
  const URL = endpoints.statistics.get;
  return axios.get(URL);
}

// ----------------------------------------------------------------------
