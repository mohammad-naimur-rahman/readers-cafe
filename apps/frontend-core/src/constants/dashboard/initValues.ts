import { initImage } from '../initImage'

export const initBookValues = (query?: { bookTitle?: string }) => ({
  title: query?.bookTitle || '',
  description: '',
  authors: [],
  image: initImage,
  genre: null,
  pageCount: 0,
  publicationYear: '',
  summaries: [],
})

export const initShortContent = (query?: { caption?: string }) => ({
  caption: query?.caption || '',
  image: initImage,
  comments: [],
})
