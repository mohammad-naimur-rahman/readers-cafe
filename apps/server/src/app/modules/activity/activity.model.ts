import { Schema, Types, model } from 'mongoose'
import { activityEnumArray } from 'validation/constants/acitivityEnumArray'
import { IActivity } from 'validation/types'
import { ActivityModel } from './activity.interface'

const activitySchema = new Schema<IActivity, ActivityModel>(
  {
    activity: {
      type: String,
      enum: activityEnumArray,
      required: true,
    },
    who: {
      type: Types.ObjectId,
      ref: 'User',
    },
    whomWith: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

export const Activity = model<IActivity, ActivityModel>(
  'Activity',
  activitySchema,
)
