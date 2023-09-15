import { ICommonQueries } from '.'

export interface IBookQueries extends ICommonQueries {
  title?: string
  publicationYear?: string
  genre?: string
  author?: string
}
