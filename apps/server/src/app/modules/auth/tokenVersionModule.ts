import { Model, Schema, Types, model } from 'mongoose'
import { IUser } from 'validation/types'

export interface ITokenVersion {
  tokenVersion: number
  user: Types.ObjectId | IUser
}

type TokenVersionModel = Model<ITokenVersion, Record<string, unknown>>

const tokenVersionSchema = new Schema<ITokenVersion, TokenVersionModel>({
  tokenVersion: {
    type: Number,
    default: 0,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    required: true,
  },
})

export const TokenVersion = model<ITokenVersion, TokenVersionModel>(
  'tokenVersion',
  tokenVersionSchema,
)
