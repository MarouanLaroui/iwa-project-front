import richAxios from '../../database/axios/axios-client';

// Not really a hook so it can bypass React's hooks rules

const usePost = <U, V>(
  path: string,
  dataToSend: U,
) => richAxios.post<V>(path, dataToSend);

export default usePost;
