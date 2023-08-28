import { Schema, Types, model } from 'mongoose'
import { IAuthor } from 'validation/types'
import { AuthorModel } from './author.interface'

const authorSchema = new Schema<IAuthor, AuthorModel>(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    books: [
      {
        type: Types.ObjectId,
        ref: 'Book',
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

export const Author = model<IAuthor>('Author', authorSchema)
