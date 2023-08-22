import { Schema, Types, model } from 'mongoose'
import { IDonation } from 'validation/types'
import { DonationModel } from './donation.interface'

const donationSchema = new Schema<IDonation, DonationModel>(
  {
    amount: {
      type: Number,
      required: true,
    },
    donorUser: {
      type: Types.ObjectId,
      ref: 'User',
    },
    receiverUser: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Donation = model<IDonation, DonationModel>(
  'Donation',
  donationSchema,
)
