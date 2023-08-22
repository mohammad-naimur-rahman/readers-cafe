import { Model } from 'mongoose'
import { IReadingList } from 'validation/types'

export type ReadingListModel = Model<IReadingList, Record<string, unknown>>
