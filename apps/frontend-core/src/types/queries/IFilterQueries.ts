import { ICommonQueries } from '.'

export interface IBookQueries extends ICommonQueries {
  title?: string
  publicationYear?: string
  genre?: string
  author?: string
}

export interface ISummaryQueries extends ICommonQueries {
  title?: string
  published?: boolean | string
}

export interface IShortContentQueries extends ICommonQueries {
  caption?: string
}

export interface IDiscussionQueries extends ICommonQueries {
  topic?: string
  status?: string
}

export interface IBlogQueries extends ICommonQueries {
  title?: string
  published?: boolean | string
}
