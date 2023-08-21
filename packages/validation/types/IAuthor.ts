import { Types } from 'mongoose'

export interface IAuthor {
  fullName: string
  books: Types.ObjectId[]
}
