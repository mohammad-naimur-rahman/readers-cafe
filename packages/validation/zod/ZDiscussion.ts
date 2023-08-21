import { Types } from 'mongoose'
import { z } from 'zod'

const CreateDiscussionZodSchema = z.object({
  topic: z.string().nonempty({
    message: 'Discussion topic is required and must not be empty!',
  }),
  description: z.string().optional(),
  comments: z.array(z.instanceof(Types.ObjectId)).optional(),
  user: z.instanceof(Types.ObjectId),
})

const UpdateDiscussionZodSchema = z.object({
  topic: z
    .string()
    .nonempty({ message: 'Discussion topic must not be empty!' })
    .optional(),
  description: z.string().optional(),
  comments: z.array(z.instanceof(Types.ObjectId)).optional(),
  user: z.instanceof(Types.ObjectId).optional(),
})

const DiscussionValidation = {
  CreateDiscussionZodSchema,
  UpdateDiscussionZodSchema,
}

export default DiscussionValidation
