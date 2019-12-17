import axios from 'axios';
import {UNAUTH_CODE, BAD_REQUEST_CODE} from "./constants";

axios.defaults.withCredentials = true;

const TIMEOUT = 5 * 1000;

export const createAPI = (handleLoginError) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.status === UNAUTH_CODE) {
      handleLoginError();
    } else if (error.response.status === BAD_REQUEST_CODE) {
      throw new Error(`Something went wrong`);
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
