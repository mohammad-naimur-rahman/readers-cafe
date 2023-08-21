import { Types } from 'mongoose'

export interface IDiscussion {
  topic: string
  description?: string
  comments: Types.ObjectId[]
  user: Types.ObjectId
}
