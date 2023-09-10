import { Types } from 'mongoose'
import { IAuthor } from './IAuthor'
import { IImage } from './IImage'
import { ISummary } from './ISummary'

export interface IBook {
  _id?: string
  title: string
  description?: string
  authors: Types.ObjectId[] | IAuthor[]
  pageCount?: number
  publicationYear?: string
  image?: IImage
  genre: Types.ObjectId | IBook
  summaries: Types.ObjectId[] | ISummary[]
}
