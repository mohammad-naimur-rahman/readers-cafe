import api from '@/redux/api/apiSlice'

const genreApi = api.injectEndpoints({
  endpoints: build => ({
    getGenres: build.query({
      query: () => '/genres',
    }),
  }),
})

export const { useGetGenresQuery } = genreApi
