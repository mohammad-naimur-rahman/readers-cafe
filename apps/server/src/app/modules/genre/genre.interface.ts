import { Model } from 'mongoose'
import { IGenre } from 'validation/types'

export type GenreModel = Model<IGenre, Record<string, unknown>>
