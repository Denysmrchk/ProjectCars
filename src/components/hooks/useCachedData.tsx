import { useState, useEffect, useCallback, FC } from 'react';
import { AxiosResponse } from 'axios';

interface CachedDataHookParams {
  fetchData: () => Promise<AxiosResponse<any, any>>;
  cacheKey: string;
  cacheDuration?: number;
  currentArray: [];
}

interface CachedDataHookResult<T> {
  data: T | null;
  updateData: () => Promise<void>;
}
export function useCachedData<T>({
  fetchData,
  cacheKey,
  cacheDuration = 10 * 60 * 1000,
}: CachedDataHookParams): CachedDataHookResult<T> {
  const [data, setData] = useState(() => {
    const cachedData = localStorage.getItem(cacheKey);
    const lastFetchTime = Number(localStorage.getItem(`${cacheKey}_lastFetchTime`));
    const now = new Date().getTime();

    if (cachedData && lastFetchTime && now - lastFetchTime < cacheDuration) {
      return JSON.parse(cachedData);
    } else {
      return null;
    }
  });

  const updateData = useCallback(async () => {
    const newData = await fetchData();
    localStorage.setItem(cacheKey, JSON.stringify(newData));
    localStorage.setItem(`${cacheKey}_lastFetchTime`, new Date().getTime().toString());
    setData(newData);
  }, [fetchData, cacheKey]);

  useEffect(() => {
    if (!data) {
      updateData();
    }
  }, [data, updateData]);

  return { data, updateData };
}
