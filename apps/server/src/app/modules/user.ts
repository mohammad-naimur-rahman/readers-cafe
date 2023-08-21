import mongoose, { Model, Schema, model } from 'mongoose'
import { IUser } from 'validation/types'
import { Router } from 'express'
import catchAsync from '../../shared/catchAsync'

export type UserModel = Model<IUser, Record<string, unknown>>

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
})

export const User =
  mongoose.models.User || model<IUser, UserModel>('Product', userSchema)

const router = Router()

router
  .route('/')
  .get(
    catchAsync(async (req, res) => {
      const users = await User.find()
      res.send(users)
    }),
  )
  .post(
    catchAsync(async (req, res) => {
      const user = await User.create(req.body)
      res.send(user)
    }),
  )

export const userRoutes = router
