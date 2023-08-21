import { Types } from 'mongoose'
import { z } from 'zod'
import { readingStatusEnumArray } from '../constants'

const CreateReadingListZodSchema = z.object({
  status: z.enum([...readingStatusEnumArray] as [string, ...string[]], {
    required_error: 'Status is required!',
  }),
  summary: z.instanceof(Types.ObjectId),
})

const UpdateReadingListZodSchema = z.object({
  status: z
    .enum([...readingStatusEnumArray] as [string, ...string[]])
    .optional(),
  summary: z.instanceof(Types.ObjectId).optional(),
})

const ReadingListValidation = {
  CreateReadingListZodSchema,
  UpdateReadingListZodSchema,
}

export default ReadingListValidation
