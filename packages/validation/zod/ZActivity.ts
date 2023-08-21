import { Types } from 'mongoose'
import { z } from 'zod'
import { activityEnumArray } from '../constants'

const CreateActivityZodSchema = z.object({
  activity: z.enum([...activityEnumArray] as [string, ...string[]], {
    required_error: 'Activity is required!',
  }),
  who: z.instanceof(Types.ObjectId).optional(),
  whomWith: z.instanceof(Types.ObjectId).optional(),
})

const UpdateActivityZodSchema = z.object({
  activity: z.enum([...activityEnumArray] as [string, ...string[]]).optional(),
  who: z.instanceof(Types.ObjectId).optional(),
  whomWith: z.instanceof(Types.ObjectId).optional(),
})

const ActivityValidation = {
  CreateActivityZodSchema,
  UpdateActivityZodSchema,
}

export default ActivityValidation
