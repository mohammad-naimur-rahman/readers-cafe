import api from '@/redux/api/apiSlice'

const blogsApi = api.injectEndpoints({
  endpoints: build => ({
    getBlogs: build.query({
      query: query => `/blogs?${query}`,
      providesTags: ['blogs'],
    }),
    getBlog: build.query({
      query: id => `/blogs/${id}`,
      providesTags: ['blog'],
    }),
    createBlog: build.mutation({
      query: ({ payload, token }) => ({
        url: '/blogs',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['blogs'],
    }),
    updateBook: build.mutation({
      query: ({ id, payload, token }) => ({
        url: `/blogs/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['blog'],
    }),
    deleteBlog: build.mutation({
      query: ({ id, token }) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
})

export const {
  useCreateBlogMutation,
  useGetBlogQuery,
  useGetBlogsQuery,
  useDeleteBlogMutation,
  useUpdateBookMutation,
} = blogsApi
