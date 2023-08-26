import { Types } from 'mongoose'
import { IBlog } from './IBlog'
import { IDiscussion } from './IDiscussion'
import { IShortContent } from './IShortContent'
import { IUser } from './IUser'

export interface IComment {
  commentText: string
  commentFor: 'blog' | 'discussion' | 'shortContent'
  user?: Types.ObjectId | IUser
  shortContent?: Types.ObjectId | IShortContent
  discussion?: Types.ObjectId | IDiscussion
  blog?: Types.ObjectId | IBlog
}
