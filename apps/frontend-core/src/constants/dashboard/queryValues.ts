import {
  IDiscussionQueries,
  IShortContentQueries,
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
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 10,
}

export const initBlogQueries = {
  search: '',
  title: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 10,
}
