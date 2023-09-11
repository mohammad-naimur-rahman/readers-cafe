import { z } from 'zod'

const CreateSummaryZodSchema = z.object({
  content: z.string().nonempty({
    message: 'Summary content is required and must not be empty!',
  }),
  book: z.string(),
  user: z.string().optional(),
  published: z.boolean().default(true),
  reviews: z.array(z.string()).optional(),
  averageStarRating: z.number().default(0).optional(),
})

const UpdateSummaryZodSchema = z.object({
  content: z
    .string()
    .nonempty({ message: 'Summary content must not be empty!' })
    .optional(),
  book: z.string().optional(),
  user: z.string().optional(),
  published: z.boolean().default(true).optional(),
  reviews: z.array(z.string()).optional(),
  averageStarRating: z.number().default(0).optional(),
})

export const SummaryValidation = {
  CreateSummaryZodSchema,
  UpdateSummaryZodSchema,
}
