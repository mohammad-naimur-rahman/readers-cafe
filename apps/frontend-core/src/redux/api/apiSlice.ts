import { API_URL } from '@/configs'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['user', 'blogs', 'blog', 'discussions', 'discussion'],
  endpoints: () => ({}),
})

export default api
