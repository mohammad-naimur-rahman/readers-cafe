import { API_URL } from '@/configs'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['blogs', 'blog'],
  endpoints: () => ({}),
})

export default api
