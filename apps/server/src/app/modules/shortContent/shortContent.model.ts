import { Schema, Types, model } from 'mongoose'
import { imageSchema } from 'validation/schema/imageSchema'
import { IShortContent } from 'validation/types'
import { ShortContentModel } from './shortContent.interface'

const shortContentSchema = new Schema<IShortContent, ShortContentModel>(
  {
    caption: {
      type: String,
      required: true,
    },
    image: imageSchema,
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
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

export const ShortContent = model<IShortContent, ShortContentModel>(
  'ShortContent',
  shortContentSchema,
)
