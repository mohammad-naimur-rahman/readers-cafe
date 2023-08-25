import { Schema, Types, model } from 'mongoose'
import { readingStatusEnumArray } from 'validation/constants/readingStatusEnumArray'
import { IReadingList } from 'validation/types'
import { ReadingListModel } from './readingList.interface'

const readingListSchema = new Schema<IReadingList, ReadingListModel>(
  {
    status: {
      type: String,
      enum: readingStatusEnumArray,
      required: true,
    },
    summary: {
      type: Types.ObjectId,
      ref: 'Summary',
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
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

export const ReadingList = model<IReadingList, ReadingListModel>(
  'ReadingList',
  readingListSchema,
)
