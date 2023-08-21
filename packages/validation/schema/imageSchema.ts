import { Schema } from 'mongoose'
import { IImage } from '../types'

export const imageSchema = new Schema<IImage>(
  {
    blurImage: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    poster: {
      type: String,
      required: false,
    },
  },
  {
    id: false,
  },
)
