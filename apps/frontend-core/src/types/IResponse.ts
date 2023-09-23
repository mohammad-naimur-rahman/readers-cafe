export interface IPagination {
  total: number
  page: number
  limit: number
}

export interface IResponse<T> {
  statusCode: number
  data: T[]
  meta: IPagination
  message: string
}
