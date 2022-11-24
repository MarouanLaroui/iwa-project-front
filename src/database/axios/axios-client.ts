import axios from 'axios';

const richAxios = axios;

richAxios.defaults.baseURL = `${process.env.REACT_APP_IWA_API_URL}`;
richAxios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};
export default richAxios;
