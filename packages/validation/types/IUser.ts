import { Types } from 'mongoose'
import { IImage } from './IImage'

export interface ISocialMediaAccounts {
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  tiktok?: string
}

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
  donations: Types.ObjectId[]
  readingList: Types.ObjectId[]
  socialMediaAccounts?: ISocialMediaAccounts
}
