import { Model } from 'mongoose'
import { IDonation } from 'validation/types'

export type DonationModel = Model<IDonation, Record<string, unknown>>
