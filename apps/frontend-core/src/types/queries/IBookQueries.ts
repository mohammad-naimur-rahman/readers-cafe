import { ICommonQueries } from '.'

export interface IBookQueries extends ICommonQueries {
  title?: string
  publicationYear?: string
  genre?: string
  author?: string
}

export interface ISummaryQueries extends ICommonQueries {
  title?: string
  published?: boolean
}

export interface IShortContentQueries extends ICommonQueries {
  caption?: string
}
