import axios from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_IWA_API_URL}`;
axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};
export default axios;
