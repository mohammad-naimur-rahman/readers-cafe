import { Types } from 'mongoose'
import { IUser } from './IUser'

export interface IDonation {
  amount: number
  donorUser: Types.ObjectId | IUser
  receiverUser: Types.ObjectId | IUser
}
