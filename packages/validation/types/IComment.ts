import { Types } from 'mongoose'

export interface IComment {
  commentText: string
  user: Types.ObjectId
  content: Types.ObjectId
}
