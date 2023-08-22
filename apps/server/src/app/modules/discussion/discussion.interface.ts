import { Model } from 'mongoose'
import { IDiscussion } from 'validation/types'

export type DiscussionModel = Model<IDiscussion, Record<string, unknown>>
