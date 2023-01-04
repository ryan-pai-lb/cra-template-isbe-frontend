import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({ 
  baseUrl: window.Config.ENV === 'local' ? `` : `${ window.Config.API_HOST}`,
  prepareHeaders: headers => {
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    headers.set('Authorization', 'Bearer 3C-rZnJWf324I7mv2gSYs6-wYi4wcfJ7OWyPvl-UOcrxBcTHPQ');

    return headers;
  },
});

const baseQueryWithInterceptor:BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result
}

export const prefixProxyEndpoint =(url:string) => {
  return  window.Config.ENV === 'local' ? `/proxy-api${url}` : url;
}

export const api = createApi({
  reducerPath: 'services',
  baseQuery: baseQueryWithInterceptor,
  endpoints: build => ({})
})
