import { z } from 'zod'
import { activityEnumArray } from '../constants'

const CreateActivityZodSchema = z.object({
  activity: z.enum([...activityEnumArray] as [string, ...string[]], {
    required_error: 'Activity is required!',
  }),
  who: z.string().optional(),
  whomWith: z.string().optional(),
})

const UpdateActivityZodSchema = z.object({
  activity: z.enum([...activityEnumArray] as [string, ...string[]]).optional(),
  who: z.string().optional(),
  whomWith: z.string().optional(),
})

const ActivityValidation = {
  CreateActivityZodSchema,
  UpdateActivityZodSchema,
}

export default ActivityValidation
