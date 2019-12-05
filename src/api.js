import axios from 'axios';

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (error) => error;

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
