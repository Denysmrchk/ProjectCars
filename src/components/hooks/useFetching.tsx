import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CallbackFunction = () => Promise<void>;

interface IFetchingResult {
  fetching: () => void;
  isLoading: boolean;
  error?: string;
}

interface FetchingOptions {
  showNotification?: boolean;
}

export const useFetching = (
  callback: CallbackFunction,
  options: FetchingOptions = { showNotification: false },
): IFetchingResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetching = useCallback(async () => {
    try {
      setIsLoading(true);
      if (options.showNotification) toast.info('Fetching data...');
      await callback();
      if (options.showNotification) toast.success('Data fetched successfully!');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An error occurred');
      }
      if (options.showNotification) toast.error('Error fetching data');
    } finally {
      setIsLoading(false);
    }
  }, [callback, options.showNotification]);

  return { fetching, isLoading, error };
};
