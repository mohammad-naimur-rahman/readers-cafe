import { Model } from 'mongoose'
import { IBlog } from 'validation/types'

export type BlogModel = Model<IBlog, Record<string, unknown>>

export type IBlogFilters = {
  search?: string
  title?: string
  createdAt?: string
}
