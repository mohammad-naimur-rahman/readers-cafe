import { Types } from 'mongoose'
import { IImage } from './IImage'

export interface IUser {
  id?: string
  _id?: string
  fullName: string
  email: string
  profilePicture?: IImage
  bio?: string
  role?: 'user' | 'admin'
  averageStarRating?: number
  summaries: Types.ObjectId[]
  blogs: Types.ObjectId[]
  discussions: Types.ObjectId[]
  shortContents: Types.ObjectId[]
  activities: Types.ObjectId[]
  donations: Types.ObjectId[]
  readingList: Types.ObjectId[]
}
