import api from '@/redux/api/apiSlice'

const bookApi = api.injectEndpoints({
  endpoints: build => ({
    getBooks: build.query({
      query: query => `/books?${query}`,
      providesTags: ['books'],
    }),
    getBook: build.query({
      query: id => `/books/${id}`,
    }),
    createBook: build.mutation({
      query: ({ payload, token }) => ({
        url: '/books',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['books'],
    }),
  }),
})

export const { useCreateBookMutation, useGetBookQuery, useGetBooksQuery } =
  bookApi
