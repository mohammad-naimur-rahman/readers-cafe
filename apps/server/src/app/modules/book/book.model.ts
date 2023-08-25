import { Schema, Types, model } from 'mongoose'
import { imageSchema } from 'validation/schema/imageSchema'
import { IBook } from 'validation/types'
import { BookModel } from './book.interface'

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    authors: [
      {
        type: Types.ObjectId,
        requried: true,
        ref: 'Author',
      },
    ],
    pageCount: Number,
    publishedDate: Date,
    image: imageSchema,
    genre: {
      type: Types.ObjectId,
      required: true,
      ref: 'Genre',
    },
    summaries: [
      {
        type: Types.ObjectId,
        ref: 'Summary',
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

export const Book = model<IBook, BookModel>('Book', bookSchema)
