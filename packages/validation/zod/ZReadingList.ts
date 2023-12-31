import { z } from 'zod'
import { readingStatusEnumArray } from '../constants'

const CreateReadingListZodSchema = z.object({
  status: z.enum([...readingStatusEnumArray] as [string, ...string[]], {
    required_error: 'Status is required!',
  }),
  summary: z.string(),
  user: z.string().optional(),
})

const UpdateReadingListZodSchema = z.object({
  status: z
    .enum([...readingStatusEnumArray] as [string, ...string[]])
    .optional(),
  summary: z.string().optional(),
  user: z.string().optional(),
})

export const ReadingListValidation = {
  CreateReadingListZodSchema,
  UpdateReadingListZodSchema,
}
