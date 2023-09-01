import { API_URL } from '@/configs'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['blogs', 'blog', 'user'],
  endpoints: () => ({}),
})

export default api
