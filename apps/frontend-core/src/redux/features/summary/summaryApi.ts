import api from '@/redux/api/apiSlice'

const summaryApi = api.injectEndpoints({
  endpoints: build => ({
    getSummaries: build.query({
      query: query => `/summaries?${query}`,
      providesTags: ['summaries'],
    }),
    getMySummaries: build.query({
      query: ({ token }) => ({
        url: '/summaries/my-contents',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['summaries'],
    }),
    getSummary: build.query({
      query: id => `/summaries/${id}`,
      providesTags: ['summary'],
    }),
    createSummary: build.mutation({
      query: ({ payload, token }) => ({
        url: '/summaries',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['summaries', 'user'],
    }),
    updateSummary: build.mutation({
      query: ({ id, payload, token }) => ({
        url: `/summaries/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['summary', 'summaries'],
    }),
    deleteSummary: build.mutation({
      query: ({ id, token }) => ({
        url: `/summaries/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['summaries', 'user'],
    }),
  }),
})

export const {
  useGetSummariesQuery,
  useGetSummaryQuery,
  useGetMySummariesQuery,
  useCreateSummaryMutation,
  useUpdateSummaryMutation,
  useDeleteSummaryMutation,
} = summaryApi
