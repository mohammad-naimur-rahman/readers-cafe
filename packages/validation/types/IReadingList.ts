import { Types } from 'mongoose'
import { ISummary } from './ISummary'

export interface IReadingList {
  status: 'Completed' | 'Reading' | 'Will read'
  summary: Types.ObjectId | ISummary
}
