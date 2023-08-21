import { ZImage } from './ZImage'
import { Types } from 'mongoose'
import { z } from 'zod'

const CreateBookZodSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'Title is required and must not be empty!' }),
  description: z.string().optional(),
  authors: z
    .array(z.instanceof(Types.ObjectId))
    .nonempty({ message: 'At least one author is required!' }),
  pageCount: z.number().positive().optional(),
  publishedDate: z.date().optional(),
  image: z
    .object({
      ZImage,
    })
    .optional(),
  genre: z.instanceof(Types.ObjectId),
  maturityRating: z.string().optional(),
  summaries: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const UpdateBookZodSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'Title must not be empty!' })
    .optional(),
  description: z.string().optional(),
  authors: z.array(z.instanceof(Types.ObjectId)).optional(),
  pageCount: z.number().positive().optional(),
  publishedDate: z.date().optional(),
  image: z
    .object({
      ZImage,
    })
    .optional(),
  genre: z.instanceof(Types.ObjectId).optional(),
  maturityRating: z.string().optional(),
  summaries: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const BookValidation = {
  CreateBookZodSchema,
  UpdateBookZodSchema,
}

export default BookValidation
