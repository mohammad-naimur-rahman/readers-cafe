import {
  IBlogQueries,
  IBookQueries,
  IDiscussionQueries,
  IShortContentQueries,
  ISummaryQueries,
} from '@/types/queries/IFilterQueries'

export const initShortContentQueries: IShortContentQueries = {
  search: '',
  caption: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 10,
}

export const initDiscussionQueries: IDiscussionQueries = {
  search: '',
  topic: '',
  status: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 10,
}

export const initBlogQueries: IBlogQueries = {
  search: '',
  title: '',
  published: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 10,
}

export const initSummaryQueries: ISummaryQueries = {
  search: '',
  title: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  published: '',
  page: 1,
  limit: 10,
}

export const initBookQueries: IBookQueries = {
  search: '',
  title: '',
  publicationYear: '',
  genre: 'Fiction',
  author: '',
  sortBy: 'title',
  sortOrder: 'asc' as 'asc',
  page: 1,
  limit: 10,
}
