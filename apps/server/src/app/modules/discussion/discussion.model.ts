import { Schema, Types, model } from 'mongoose'
import { IDiscussion } from 'validation/types'
import { DiscussionModel } from './discussion.interface'

const DiscussionSchema = new Schema<IDiscussion, DiscussionModel>(
  {
    topic: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: String,
    comments: [
      {
        type: Types.ObjectId,
        ref: 'Comment',
      },
    ],
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Discussion = model<IDiscussion, DiscussionModel>(
  'Discussion',
  DiscussionSchema,
)
