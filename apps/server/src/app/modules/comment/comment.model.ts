import { Schema, Types, model } from 'mongoose'
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
    shortContent: Types.ObjectId,
    discussion: Types.ObjectId,
    blog: Types.ObjectId,
  },
  {
    timestamps: true,
  },
)

export const Comment = model<IComment, CommentModel>('Comment', commentSchema)
