import richAxios from '../../database/axios/axios-client';

// Not really a hook so it can bypass React's hooks rules

const usePut = <U, V>(
  path: string,
  dataToSend: U,
) => richAxios.put<V>(path, dataToSend);

export default usePut;
