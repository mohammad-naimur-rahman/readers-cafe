import api from '@/redux/api/apiSlice'

const userApi = api.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query({
      query: ({ id, token }) => ({
        url: `/users/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['user'],
    }),
    updateProfile: build.mutation({
      query: ({ id, payload, token }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['user'],
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi
