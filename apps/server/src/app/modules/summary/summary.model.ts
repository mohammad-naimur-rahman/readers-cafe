import { Schema, Types, model } from 'mongoose'
import { ISummary } from 'validation/types'
import { SummaryModel } from './summary.interface'

const summarySchema = new Schema<ISummary, SummaryModel>(
  {
    content: {
      type: String,
      required: true,
    },
    book: {
      type: Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    published: {
      type: Boolean,
      default: true,
    },
    reviews: [
      {
        type: Types.ObjectId,
        ref: 'Review',
      },
    ],
    averageStarRating: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Summary = model<ISummary, SummaryModel>('Summary', summarySchema)
