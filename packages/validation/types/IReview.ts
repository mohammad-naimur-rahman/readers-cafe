import { Types } from 'mongoose'

export interface IReview {
  starRating: number
  reviewText: string
  user: Types.ObjectId
  summary: Types.ObjectId
}
