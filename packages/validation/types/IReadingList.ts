import { Types } from 'mongoose'

export interface IReadingList {
  status: 'Completed' | 'Reading' | 'Will read'
  summary: Types.ObjectId
}
