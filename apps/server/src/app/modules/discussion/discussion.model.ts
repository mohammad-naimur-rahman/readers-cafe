import { Schema, Types, model } from 'mongoose'
import { IDiscussion } from 'validation/types'
import { DiscussionModel } from './discussion.interface'

const DiscussionSchema = new Schema<IDiscussion, DiscussionModel>(
  {
    topic: {
      type: String,
      required: true,
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
