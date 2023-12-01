import { useMemo } from 'react';
import { useSearchParams as _useSearchParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export function useSearchParams() {
  const useSearchParam = _useSearchParams();
  const [searchParams] = useSearchParam;

  return useMemo(() => searchParams, [searchParams]);
}
