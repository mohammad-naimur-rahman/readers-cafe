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
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    reviews: [
      {
        type: Types.ObjectId,
        ref: 'Review',
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

export const Summary = model<ISummary, SummaryModel>('Summary', summarySchema)
