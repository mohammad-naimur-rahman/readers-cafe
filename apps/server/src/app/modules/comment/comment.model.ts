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
      ref: 'User',
      required: true,
    },
    commentFor: {
      type: String,
      enum: commentForEnumArray,
      required: true,
    },
    shortContent: {
      type: Types.ObjectId,
      ref: 'ShortContent',
    },
    discussion: {
      type: Types.ObjectId,
      ref: 'Discussion',
    },
    blog: {
      type: Types.ObjectId,
      ref: 'Blog',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Comment = model<IComment, CommentModel>('Comment', commentSchema)
