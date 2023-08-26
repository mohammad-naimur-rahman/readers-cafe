import { Schema, Types, model } from 'mongoose'
import slugify from 'slugify'
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
      required: false,
      unique: true,
      index: {
        unique: true,
      },
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

// Generating automatic slug from the title
// eslint-disable-next-line func-names
DiscussionSchema.pre('save', function (next) {
  this.slug = slugify(this.topic, { replacement: '-', lower: true, trim: true })
  next()
})

export const Discussion = model<IDiscussion, DiscussionModel>(
  'Discussion',
  DiscussionSchema,
)
