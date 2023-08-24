import { z } from 'zod'
import { ZImage } from './ZImage'

const CreateBookZodSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'Title is required and must not be empty!' }),
  description: z.string().optional(),
  authors: z
    .array(z.string())
    .nonempty({ message: 'At least one author is required!' }),
  pageCount: z.number().positive().optional(),
  publishedDate: z.date().optional(),
  image: z
    .object({
      ZImage,
    })
    .optional(),
  genre: z.string(),
  maturityRating: z.string().optional(),
  summaries: z.array(z.string()).optional(),
})

const UpdateBookZodSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'Title must not be empty!' })
    .optional(),
  description: z.string().optional(),
  authors: z.array(z.string()).optional(),
  pageCount: z.number().positive().optional(),
  publishedDate: z.date().optional(),
  image: z
    .object({
      ZImage,
    })
    .optional(),
  genre: z.string().optional(),
  maturityRating: z.string().optional(),
  summaries: z.array(z.string()).optional(),
})

const BookValidation = {
  CreateBookZodSchema,
  UpdateBookZodSchema,
}

export default BookValidation
