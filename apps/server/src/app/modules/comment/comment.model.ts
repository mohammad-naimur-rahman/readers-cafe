import { Schema, Types, model } from 'mongoose'
import { commentForEnumArray } from 'validation/constants/commentForEnumArray'
import { IComment } from 'validation/types'
import { CommentModel } from './comment.interface'

const commentSchema = new Schema<IComment, CommentModel>(
  {
    commentText: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
    },
    commentFor: {
      type: String,
      enum: commentForEnumArray,
      required: true,
    },
    shortContent: Types.ObjectId,
    discussion: Types.ObjectId,
    blog: Types.ObjectId,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Comment = model<IComment, CommentModel>('Comment', commentSchema)
