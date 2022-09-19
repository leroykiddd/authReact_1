import axios from 'axios';
import history from 'src/utils/history';
import { getTokenFromLS } from 'src/utils';
import { PublicRoutesEnum } from 'src/router';
import { ErrorResponse } from 'src/store/features/types';

export const baseURL: string = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getTokenFromLS()}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error): Promise<ErrorResponse> => {
    if (error.response.status == 401) {
      localStorage.clear();
      history.push(PublicRoutesEnum.LOGIN);
    }

    return Promise.reject(error.response.data);
  },
);

export default axiosInstance;
