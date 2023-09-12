import api from '@/redux/api/apiSlice'

const shortContentApi = api.injectEndpoints({
  endpoints: build => ({
    getShortContents: build.query({
      query: query => `/short-contents?${query}`,
      providesTags: ['shortContents'],
    }),
    getMyShortContents: build.query({
      query: ({ token }) => ({
        url: '/short-contents/my-contents',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['shortContents'],
    }),
    getShortContent: build.query({
      query: id => `/short-contents/${id}`,
      providesTags: ['shortContent'],
    }),
    createShortContent: build.mutation({
      query: ({ payload, token }) => ({
        url: '/short-contents',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['shortContents', 'user'],
    }),
    updateShortContent: build.mutation({
      query: ({ id, payload, token }) => ({
        url: `/short-contents/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['shortContent', 'shortContents'],
    }),
    deleteShortContent: build.mutation({
      query: ({ id, token }) => ({
        url: `/short-contents/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['shortContents', 'user'],
    }),
  }),
})

export const {
  useCreateShortContentMutation,
  useGetShortContentQuery,
  useGetMyShortContentsQuery,
  useGetShortContentsQuery,
  useUpdateShortContentMutation,
  useDeleteShortContentMutation,
} = shortContentApi
