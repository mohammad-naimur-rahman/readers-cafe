import { Types } from 'mongoose'
import { IImage } from './IImage'

export interface IBlog {
  title: string
  coverImage?: IImage
  blogContent: string
  user: Types.ObjectId
  comments: Types.ObjectId[]
}
