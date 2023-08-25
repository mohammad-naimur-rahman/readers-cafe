import { Types } from 'mongoose'
import { IImage } from './IImage'

export interface IBook {
  title: string
  description?: string
  authors: Types.ObjectId[]
  pageCount?: number
  publishedDate?: Date
  image?: IImage
  genre: Types.ObjectId | IBook
  summaries: Types.ObjectId[]
}
