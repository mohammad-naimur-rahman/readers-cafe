import { Schema, Types, model } from 'mongoose'
import { IReview } from 'validation/types'
import { ReviewModel } from './review.interface'

const reviewSchema = new Schema<IReview, ReviewModel>(
  {
    starRating: {
      type: Number,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    summary: {
      type: Types.ObjectId,
      ref: 'Summary',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Review = model<IReview, ReviewModel>('Review', reviewSchema)
