import { Types } from 'mongoose'
import { IUser } from './IUser'

export interface IDiscussion {
  topic: string
  description?: string
  comments: Types.ObjectId[]
  user: Types.ObjectId | IUser
}
