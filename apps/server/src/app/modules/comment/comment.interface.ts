import { Model } from 'mongoose'
import { IComment } from 'validation/types'

export type CommentModel = Model<IComment, Record<string, unknown>>
