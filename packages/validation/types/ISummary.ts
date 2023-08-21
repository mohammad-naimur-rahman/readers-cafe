import { Types } from 'mongoose'

export interface ISummary {
  content: string
  book: Types.ObjectId
  user: Types.ObjectId
  reviews: Types.ObjectId[]
}
