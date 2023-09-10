import api from '@/redux/api/apiSlice'

const authorApi = api.injectEndpoints({
  endpoints: build => ({
    getAuthors: build.query({
      query: query => `/authors?${query}`,
      providesTags: ['authors'],
    }),
    createAuthor: build.mutation({
      query: ({ payload, token }) => ({
        url: '/authors',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['authors'],
    }),
  }),
})

export const { useCreateAuthorMutation, useGetAuthorsQuery } = authorApi
