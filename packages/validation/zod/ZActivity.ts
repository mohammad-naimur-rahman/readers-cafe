import { Types } from 'mongoose'
import { z } from 'zod'

const CreateActivityZodSchema = z.object({
  activity: z.enum(
    [
      'signup',
      'login',
      'logout',
      'post',
      'comment',
      'delete',
      'react',
      'donate',
      'donateReceive',
    ],
    { required_error: 'Activity is required!' },
  ),
  who: z.instanceof(Types.ObjectId).optional(),
  whomWith: z.instanceof(Types.ObjectId).optional(),
})

const UpdateActivityZodSchema = z.object({
  activity: z
    .enum([
      'signup',
      'login',
      'logout',
      'post',
      'comment',
      'delete',
      'react',
      'donate',
      'donateReceive',
    ])
    .optional(),
  who: z.instanceof(Types.ObjectId).optional(),
  whomWith: z.instanceof(Types.ObjectId).optional(),
})

const ActivityValidation = {
  CreateActivityZodSchema,
  UpdateActivityZodSchema,
}

export default ActivityValidation
