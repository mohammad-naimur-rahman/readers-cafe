import { Model } from 'mongoose'
import { IShortContent } from 'validation/types'

export type ShortContentModel = Model<IShortContent, Record<string, unknown>>

export type IShortContentFilters = {
  search?: string
  caption?: string
}
