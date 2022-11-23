import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useFetchMany<T>(
  path: string,
): [T[], React.Dispatch<React.SetStateAction<T[]>>, boolean, Error | undefined] {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      axios
        .get<T[]>(`http://localhost:8080/${path}`)
        .then((response) => setData(response.data))
        .catch((err) => {
          setError(err);
        })
        .finally(() => setLoading(false));
    }());
  }, [path]);

  return [data, setData, loading, error];
}
