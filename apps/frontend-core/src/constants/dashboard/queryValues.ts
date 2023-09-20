import {
  IDiscussionQueries,
  IShortContentQueries,
} from '@/types/queries/IFilterQueries'

export const initShortContentQueries: IShortContentQueries = {
  search: '',
  caption: '',
  sortBy: 'createdAt',
  sortOrder: 'asc' as 'asc',
  page: 1,
  limit: 10,
}

export const initDiscussionQueries: IDiscussionQueries = {
  search: '',
  topic: '',
  sortBy: 'createdAt',
  sortOrder: 'asc' as 'asc',
  page: 1,
  limit: 10,
}
