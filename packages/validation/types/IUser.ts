import { Types } from 'mongoose'

export interface IUser extends Document {
  id?: string
  fullName: string
  email: string
  profilePicture?: string
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
