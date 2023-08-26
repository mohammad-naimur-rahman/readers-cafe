import { Schema, Types, model } from 'mongoose'
import slugify from 'slugify'
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
      required: false,
      index: {
        unique: true,
      },
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

// Generating automatic slug from the title
// eslint-disable-next-line func-names
blogSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { replacement: '-', lower: true, trim: true })
  next()
})

export const Blog = model<IBlog, BlogModel>('Blog', blogSchema)
