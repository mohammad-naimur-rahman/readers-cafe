import { Model } from 'mongoose'
import { IActivity } from 'validation/types'

export type ActivityModel = Model<IActivity, Record<string, unknown>>
