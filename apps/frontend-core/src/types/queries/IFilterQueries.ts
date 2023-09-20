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

export interface IDiscussionQueries extends ICommonQueries {
  topic?: string
}

export interface IBLogQueries extends ICommonQueries {
  title?: string
}
