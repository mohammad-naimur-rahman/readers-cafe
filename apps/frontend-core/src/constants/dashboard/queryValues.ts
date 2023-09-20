import {
  IBLogQueries,
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
  status: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 10,
}

export const initBlogQueries: IBLogQueries = {
  search: '',
  title: '',
  published: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 10,
}
