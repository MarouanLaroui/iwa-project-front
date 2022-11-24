import { useEffect, useState } from 'react';
import richAxios from '../../database/axios/axios-client';

export default function useFetch<T>(
  path: string,
): [T | undefined, boolean, Error | undefined] {
  const [data, setData] = useState<T>(undefined as T);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      richAxios
        .get<T>(path)
        .then((response) => setData(response.data))
        .catch((err) => {
          setError(err);
        })
        .finally(() => setLoading(false));
    }());
  }, [path]);

  return [data, loading, error];
}
