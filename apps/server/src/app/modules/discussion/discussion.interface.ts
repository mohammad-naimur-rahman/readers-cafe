import { Model } from 'mongoose'
import { IDiscussion } from 'validation/types'

export type DiscussionModel = Model<IDiscussion, Record<string, unknown>>

export type IDiscussionFilters = {
  search?: string
  topic?: string
  createdAt?: string
}
