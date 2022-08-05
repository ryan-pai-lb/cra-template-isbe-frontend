import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const errorHandler = (error: { response: any }): void => {
  const { response } = error;
  throw(response);
};

export const request = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

request.interceptors.request.use(function(config:AxiosRequestConfig)  {
  const accountAuth = JSON.parse(localStorage.getItem('account-auth') || '{}') ;
  
  config.url = window.Config.NODE_ENV === 'local' ? `/proxy-api${config.url}` : `${ window.Config.API_HOST}${config.url}`;
  
  if(accountAuth.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accountAuth.token}`
    }
  }
  return config
});

request.interceptors.response.use(function(response: AxiosResponse) {
  return response.data
}, errorHandler)

export default request;