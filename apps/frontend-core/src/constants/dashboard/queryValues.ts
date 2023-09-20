import { IShortContentQueries } from '@/types/queries/IBookQueries'

export const initSummaryQueries: IShortContentQueries = {
  search: '',
  caption: '',
  sortBy: 'createdAt',
  sortOrder: 'asc' as 'asc',
  page: 1,
  limit: 10,
}
