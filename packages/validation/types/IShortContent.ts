import { Types } from 'mongoose'
import { IImage } from './IImage'
import { IUser } from './IUser'

export interface IShortContent {
  caption: string
  image?: IImage
  user?: Types.ObjectId | IUser
  comments: Types.ObjectId[]
}
