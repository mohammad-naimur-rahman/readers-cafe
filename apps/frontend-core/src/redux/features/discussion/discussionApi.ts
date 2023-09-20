import api from '@/redux/api/apiSlice'

const discussionApi = api.injectEndpoints({
  endpoints: build => ({
    getDiscussions: build.query({
      query: query => `/discussions?${query}`,
      providesTags: ['discussions'],
    }),
    getMyDiscussions: build.query({
      query: ({ token, query }) => ({
        url: `/discussions/my-contents?${query}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['discussions'],
    }),
    getDiscussion: build.query({
      query: id => `/discussions/${id}`,
      providesTags: ['discussion'],
    }),
    createDiscussion: build.mutation({
      query: ({ payload, token }) => ({
        url: '/discussions',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['discussions', 'user'],
    }),
    updateDiscussion: build.mutation({
      query: ({ id, payload, token }) => ({
        url: `/discussions/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['discussion', 'discussions'],
    }),
    deleteDiscussion: build.mutation({
      query: ({ id, token }) => ({
        url: `/discussions/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['discussions', 'user'],
    }),
  }),
})

export const {
  useCreateDiscussionMutation,
  useGetDiscussionQuery,
  useGetMyDiscussionsQuery,
  useGetDiscussionsQuery,
  useUpdateDiscussionMutation,
  useDeleteDiscussionMutation,
} = discussionApi
