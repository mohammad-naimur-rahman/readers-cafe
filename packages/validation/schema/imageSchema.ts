import { Schema } from 'mongoose'
import { IImage } from '../types'

export const imageSchema = new Schema<IImage>(
  {
    url: String,
    dominantColor: String,
  },
  {
    id: false,
  },
)
