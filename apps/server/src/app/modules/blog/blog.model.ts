import { Schema, Types, model } from 'mongoose'
import { imageSchema } from 'validation/schema/imageSchema'
import { IBlog } from 'validation/types'
import { BlogModel } from './blog.interface'

const blogSchema = new Schema<IBlog, BlogModel>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    coverImage: imageSchema,
    blogContent: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
    comments: [
      {
        type: Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Blog = model<IBlog, BlogModel>('Blog', blogSchema)
