import { z } from 'zod'
import { ZImage } from './ZImage'

const CreateBlogZodSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'Title is required and must not be empty!' }),
  slug: z.string().optional(),
  coverImage: z
    .object({
      ZImage,
    })
    .optional(),
  blogContent: z
    .string()
    .nonempty({ message: 'Blog content is required and must not be empty!' }),
  user: z.string().optional(),
  published: z.boolean().default(true),
  comments: z.array(z.string()).optional(),
})

const UpdateBlogZodSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'Title must not be empty!' })
    .optional(),
  slug: z.string().optional(),
  coverImage: z
    .object({
      ZImage,
    })
    .optional(),
  blogContent: z
    .string()
    .nonempty({ message: 'Blog content must not be empty!' })
    .optional(),
  user: z.string().optional(),
  published: z.boolean().default(true).optional(),
  comments: z.array(z.string()).optional(),
})

export const BlogValidation = {
  CreateBlogZodSchema,
  UpdateBlogZodSchema,
}
