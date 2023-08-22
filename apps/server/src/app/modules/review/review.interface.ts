import { Model } from 'mongoose'
import { IReview } from 'validation/types'

export type ReviewModel = Model<IReview, Record<string, unknown>>
