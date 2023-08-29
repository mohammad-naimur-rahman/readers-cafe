import { Types } from 'mongoose'
import { ISummary } from './ISummary'
import { IUser } from './IUser'

export interface IReadingList {
  _id?: Types.ObjectId
  status: 'Completed' | 'Reading' | 'Will read'
  summary: Types.ObjectId | ISummary
  user?: Types.ObjectId | IUser
}
