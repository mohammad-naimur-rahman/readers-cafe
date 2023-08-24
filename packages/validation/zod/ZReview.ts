import { z } from 'zod'

const CreateReviewZodSchema = z.object({
  starRating: z
    .number()
    .min(1)
    .max(5, { message: 'Star rating must be between 1 and 5!' }),
  reviewText: z
    .string()
    .nonempty({ message: 'Review text is required and must not be empty!' }),
  user: z.string(),
  summary: z.string(),
})

const UpdateReviewZodSchema = z.object({
  starRating: z
    .number()
    .min(1)
    .max(5, { message: 'Star rating must be between 1 and 5!' })
    .optional(),
  reviewText: z
    .string()
    .nonempty({ message: 'Review text must not be empty!' })
    .optional(),
  user: z.string().optional(),
  summary: z.string().optional(),
})

const ReviewValidation = {
  CreateReviewZodSchema,
  UpdateReviewZodSchema,
}

export default ReviewValidation
