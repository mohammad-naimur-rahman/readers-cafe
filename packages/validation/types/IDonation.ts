import { Types } from 'mongoose'

export interface IDonation {
  amount: number
  donorUser: Types.ObjectId
  receiverUser: Types.ObjectId
}
