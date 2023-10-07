import { IPagination } from '@/types/IResponse'

export function isLastPage(meta: IPagination) {
  const itemsProcessed = (meta.page - 1) * meta.limit
  return meta.total > itemsProcessed + meta.limit
}
