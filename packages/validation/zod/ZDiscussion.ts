import { z } from 'zod'

const CreateDiscussionZodSchema = z.object({
  topic: z.string().nonempty({
    message: 'Discussion topic is required and must not be empty!',
  }),
  slug: z.string().nonempty({
    message: 'Discussion topic is required and must not be empty!',
  }),
  description: z.string().optional(),
  comments: z.array(z.string()).optional(),
  user: z.string().optional(),
  status: z.boolean().default(true),
})

const UpdateDiscussionZodSchema = z.object({
  topic: z
    .string()
    .nonempty({ message: 'Discussion topic must not be empty!' })
    .optional(),
  slug: z
    .string()
    .nonempty({
      message: 'Discussion topic is required and must not be empty!',
    })
    .optional(),
  description: z.string().optional(),
  comments: z.array(z.string()).optional(),
  user: z.string().optional(),
  status: z.boolean().optional(),
})

export const DiscussionValidation = {
  CreateDiscussionZodSchema,
  UpdateDiscussionZodSchema,
}
