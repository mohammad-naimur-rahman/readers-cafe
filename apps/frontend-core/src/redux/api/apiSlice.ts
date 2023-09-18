import { API_URL } from '@/configs'
import { calculateTokenExpiration } from '@/utils/auth/calculateTokenExpiration'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { getCookie, setCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import toast from 'react-hot-toast'
import { ITokenData } from 'validation/types'

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const refreshToken = getCookie('refreshToken')
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    const refreshResult = await axios.get(`${API_URL}/auth/access-token`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    if (refreshResult?.data?.success) {
      const newAccessToken = refreshResult.data.data.accessToken
      const accessTokenData: ITokenData = jwtDecode(newAccessToken)
      const accessTokenExpiration = calculateTokenExpiration(accessTokenData)
      setCookie('accessToken', newAccessToken, {
        maxAge: accessTokenExpiration / 1000,
      })
      result = await baseQuery(args, api, extraOptions)
    } else {
      toast.error('Please login again!')
    }
  }

  return result
}

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'user',
    'blogs',
    'blog',
    'discussions',
    'discussion',
    'shortContents',
    'shortContent',
    'summaries',
    'summary',
    'books',
    'authors',
  ],
  endpoints: () => ({}),
})

export default api
