import { Types } from 'mongoose'
import { ISummary } from './ISummary'
import { IUser } from './IUser'

export interface IReview {
  _id?: Types.ObjectId
  starRating: number
  reviewText: string
  user?: Types.ObjectId | IUser
  summary: Types.ObjectId | ISummary
}
