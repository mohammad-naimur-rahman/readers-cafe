import { Types } from 'mongoose'
import { IUser } from './IUser'

export interface IDiscussion {
  _id?: string
  topic: string
  slug?: string
  description?: string
  comments: Types.ObjectId[]
  user?: Types.ObjectId | IUser
  status: boolean
}
