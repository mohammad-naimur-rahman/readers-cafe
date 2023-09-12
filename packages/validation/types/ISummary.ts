import { Types } from 'mongoose'
import { IBook } from './IBook'
import { IUser } from './IUser'

export interface ISummary {
  _id?: string
  content: string
  book: Types.ObjectId | IBook
  user?: Types.ObjectId | IUser
  published: boolean
  reviews: Types.ObjectId[]
  averageStarRating?: number
}
