import { Types } from 'mongoose'
import { IImage } from './IImage'
import { IUser } from './IUser'

export interface IBlog {
  _id?: string
  title: string
  slug: string
  coverImage?: IImage
  blogContent: string
  user: Types.ObjectId | IUser
  comments: Types.ObjectId[]
}
