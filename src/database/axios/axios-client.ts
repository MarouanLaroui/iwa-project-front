import axios from 'axios';

const richAxios = axios;

richAxios.defaults.baseURL = `${process.env.REACT_APP_IWA_API_URL}`;
richAxios.interceptors.request.use((config) => {
  if (config && config.headers) {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }
  return config;
});
export default richAxios;
