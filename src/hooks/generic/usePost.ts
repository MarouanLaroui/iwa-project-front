import axios from 'axios';
import { useEffect, useState } from 'react';

export default function usePost<U, V>(
  path: string,
  dataToSend: U,
): [V | undefined, boolean, Error | undefined] {
  const [data, setData] = useState<V>(undefined as V);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      axios
        .post<V>(process.env.REACT_APP_IWA_API_URL + path, dataToSend)
        .then((response) => setData(response.data))
        .catch((err) => {
          setError(err);
        })
        .finally(() => setLoading(false));
    }());
  }, [path]);

  return [data, loading, error];
}
