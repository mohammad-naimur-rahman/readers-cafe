import { SortOrder } from 'mongoose'
type IOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}
type IOptionsResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}
declare const calculatePagination: (options: IOptions) => IOptionsResult
export default calculatePagination
//# sourceMappingURL=paginationHelper.d.ts.map
