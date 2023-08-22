import { Types } from 'mongoose'
import { IBook } from './IBook'
import { IUser } from './IUser'

export interface ISummary {
  content: string
  book: Types.ObjectId | IBook
  user: Types.ObjectId | IUser
  reviews: Types.ObjectId[]
}
