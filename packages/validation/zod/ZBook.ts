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
  pageCount: z.number().optional(),
  publicationYear: z.string().optional(),
  image: ZImage.optional(),
  genre: z.string(),
  summaries: z.array(z.string()).optional(),
})

const UpdateBookZodSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'Title must not be empty!' })
    .optional(),
  description: z.string().optional(),
  authors: z.array(z.string()).optional(),
  pageCount: z.number().optional(),
  publicationYear: z.date().optional(),
  image: ZImage.optional(),
  genre: z.string().optional(),
  summaries: z.array(z.string()).optional(),
})

export const BookValidation = {
  CreateBookZodSchema,
  UpdateBookZodSchema,
}
