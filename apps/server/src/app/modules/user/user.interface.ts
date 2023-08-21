import { IUser } from 'validation/types/IUser'
import { Model } from 'mongoose'

export type UserModel = Model<IUser, Record<string, unknown>>
