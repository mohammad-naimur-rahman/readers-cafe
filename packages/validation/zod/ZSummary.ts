import { Types } from 'mongoose'
import { z } from 'zod'

const CreateSummaryZodSchema = z.object({
  content: z.string().nonempty({
    message: 'Summary content is required and must not be empty!',
  }),
  book: z.instanceof(Types.ObjectId),
  user: z.instanceof(Types.ObjectId),
  reviews: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const UpdateSummaryZodSchema = z.object({
  content: z
    .string()
    .nonempty({ message: 'Summary content must not be empty!' })
    .optional(),
  book: z.instanceof(Types.ObjectId).optional(),
  user: z.instanceof(Types.ObjectId).optional(),
  reviews: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const SummaryValidation = {
  CreateSummaryZodSchema,
  UpdateSummaryZodSchema,
}

export default SummaryValidation
