import { Schema, Types, model } from 'mongoose'
import { genreEmunArray } from 'validation/constants/genreEnumArray'
import { IGenre } from 'validation/types'
import { GenreModel } from './genre.interface'

const genreSchema = new Schema<IGenre, GenreModel>(
  {
    genre: {
      type: String,
      enum: genreEmunArray,
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

export const Genre = model<IGenre, GenreModel>('Genre', genreSchema)
