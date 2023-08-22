import { Schema } from 'mongoose'
import { IImage } from '../types'

export const imageSchema = new Schema<IImage>(
  {
    blurImage: String,
    thumbnail: String,
    poster: String,
  },
  {
    id: false,
  },
)
