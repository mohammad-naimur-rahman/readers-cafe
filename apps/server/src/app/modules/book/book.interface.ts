import { Model } from 'mongoose'
import { IBook } from 'validation/types'

export type BookModel = Model<IBook, Record<string, unknown>>

export type IBookFilters = {
  search?: string
  title?: string
}
