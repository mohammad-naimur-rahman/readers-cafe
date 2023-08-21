import { Types } from 'mongoose'
import { IImage } from './IImage'

export interface IShortContent {
  caption: string
  image?: IImage
  user: Types.ObjectId
  comments: Types.ObjectId[]
}
