import api from '@/redux/api/apiSlice'

const blogsApi = api.injectEndpoints({
  endpoints: build => ({
    getBlogs: build.query({
      query: query => `/blogs?${query}`,
      providesTags: ['blogs'],
    }),
    getMyBlogs: build.query({
      query: ({ token, query }) => ({
        url: `/blogs/my-contents?${query}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
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
      invalidatesTags: ['blogs', 'user'],
    }),
    updateBlog: build.mutation({
      query: ({ id, payload, token }) => ({
        url: `/blogs/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['blog', 'blogs'],
    }),
    deleteBlog: build.mutation({
      query: ({ id, token }) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['blogs', 'user'],
    }),
  }),
})

export const {
  useCreateBlogMutation,
  useGetBlogQuery,
  useGetMyBlogsQuery,
  useGetBlogsQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogsApi
