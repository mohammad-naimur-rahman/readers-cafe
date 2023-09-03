import { Schema, model } from 'mongoose'
import { imageSchema } from 'validation/schema/imageSchema'
import { IUser } from 'validation/types/IUser'
import { UserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: imageSchema,
    bio: String,

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    averageStarRating: {
      type: Number,
      default: 0,
    },
    summaries: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Summary',
      },
    ],
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    discussions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Discussion',
      },
    ],
    shortContents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ShortContent',
      },
    ],
    donations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Donation',
      },
    ],
    readingList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reading',
      },
    ],
    socialMediaAccounts: {
      facebook: String,
      instagram: String,
      twitter: String,
      youtube: String,
      tiktok: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const User = model<IUser, UserModel>('User', userSchema)
