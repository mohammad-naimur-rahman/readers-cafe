import { Schema, Types, model } from 'mongoose'
import { IAuthor } from 'validation/types'
import { AuthorModel } from './author.interface'

const authorSchema = new Schema<IAuthor, AuthorModel>(
  {
    fullName: {
      type: String,
      required: true,
    },
    books: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const Author = model<IAuthor>('Author', authorSchema)
