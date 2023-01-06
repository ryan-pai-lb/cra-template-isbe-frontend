import { api, prefixProxyEndpoint } from '@/services';

export type MeResponse = {
 error?:any;
 data?:any
}

export type MetaResponse = {
  error?:any;
  data?:any
 }
 

export const globalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<MeResponse,void>({
      query: () => prefixProxyEndpoint(`/v1/me`)
    }),
    getMeta: builder.query<MetaResponse,void>({
      query: () => prefixProxyEndpoint(`/v1/meta`)
    })
  })
});

globalApi.enhanceEndpoints({
  addTagTypes: ['Global'],
  endpoints: {
    getMe: {
      providesTags: [{type: 'Global', id: 'ME'}]
    },
    getMeta: {
      providesTags: [{type: 'Global', id: 'META'}]
    }
  }
})

export default globalApi;