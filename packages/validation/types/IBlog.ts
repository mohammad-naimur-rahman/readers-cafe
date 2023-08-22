import { Types } from 'mongoose'
import { IImage } from './IImage'
import { IUser } from './IUser'

export interface IBlog {
  title: string
  coverImage?: IImage
  blogContent: string
  user: Types.ObjectId | IUser
  comments: Types.ObjectId[]
}
