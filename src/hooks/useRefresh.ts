import { useState, useCallback } from 'react';

interface UseRefreshResult {
  refreshing: boolean;
  onRefresh: (callback: () => Promise<void>) => Promise<void>;
}

/**
 * Custom hook to manage pull-to-refresh state
 *
 * @returns Refreshing state and onRefresh handler
 */
export const useRefresh = (): UseRefreshResult => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(async (callback: () => Promise<void>) => {
    setRefreshing(true);
    try {
      await callback();
    } finally {
      setRefreshing(false);
    }
  }, []);

  return {
    refreshing,
    onRefresh,
  };
};
