import { Model } from 'mongoose'
import { ISummary } from 'validation/types'

export type SummaryModel = Model<ISummary, Record<string, unknown>>
