import { Types } from 'mongoose'
import { z } from 'zod'

const CreateReadingListZodSchema = z.object({
  status: z.enum(['Completed', 'Reading', 'Will read'], {
    required_error: 'Status is required!',
  }),
  summary: z.instanceof(Types.ObjectId),
})

const UpdateReadingListZodSchema = z.object({
  status: z.enum(['Completed', 'Reading', 'Will read']).optional(),
  summary: z.instanceof(Types.ObjectId).optional(),
})

const ReadingListValidation = {
  CreateReadingListZodSchema,
  UpdateReadingListZodSchema,
}

export default ReadingListValidation
