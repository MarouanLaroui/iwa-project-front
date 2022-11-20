import axios from 'axios';

const usePost = <U, V>(
  path: string,
  dataToSend: U,
) => axios.post<V>(process.env.REACT_APP_IWA_API_URL + path, dataToSend);

export default usePost;
