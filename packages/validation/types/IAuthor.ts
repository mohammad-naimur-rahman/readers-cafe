import { Types } from 'mongoose'

export interface IAuthor {
  _id?: string
  fullName: string
  books: Types.ObjectId[]
}
