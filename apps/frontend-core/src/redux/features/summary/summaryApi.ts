import api from '@/redux/api/apiSlice'

const summaryApi = api.injectEndpoints({
  endpoints: build => ({
    getSummaries: build.query({
      query: query => `/summaries?${query}`,
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
      invalidatesTags: ['summaries'],
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
      invalidatesTags: ['summary'],
    }),
    deleteSummary: build.mutation({
      query: ({ id, token }) => ({
        url: `/summaries/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['summaries'],
    }),
  }),
})

export const {
  useGetSummariesQuery,
  useGetSummaryQuery,
  useCreateSummaryMutation,
  useUpdateSummaryMutation,
  useDeleteSummaryMutation,
} = summaryApi
