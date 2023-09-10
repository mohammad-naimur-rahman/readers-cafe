import { Model } from 'mongoose'
import { IAuthor } from 'validation/types'

export type AuthorModel = Model<IAuthor, Record<string, unknown>>

export type IAuthorFilters = {
  search?: string
  fullName?: string
}
