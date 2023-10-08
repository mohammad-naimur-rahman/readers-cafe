import { Types } from 'mongoose'
import { IImage } from './IImage'
import { IUser } from './IUser'

export interface IShortContent {
  _id?: string
  caption: string
  image?: IImage
  user?: Types.ObjectId | IUser
  comments: Types.ObjectId[]
  createdAt?: Date
}
