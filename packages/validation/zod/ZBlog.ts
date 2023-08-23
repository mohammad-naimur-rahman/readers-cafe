import { Types } from 'mongoose'
import { z } from 'zod'
import { ZImage } from './ZImage'

const CreateBlogZodSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'Title is required and must not be empty!' }),
  slug: z
    .string()
    .nonempty({ message: 'Slug is required and must not be empty!' }),
  coverImage: z
    .object({
      ZImage,
    })
    .optional(),
  blogContent: z
    .string()
    .nonempty({ message: 'Blog content is required and must not be empty!' }),
  user: z.instanceof(Types.ObjectId),
  comments: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const UpdateBlogZodSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'Title must not be empty!' })
    .optional(),
  slug: z
    .string()
    .nonempty({ message: 'Slug is required and must not be empty!' })
    .optional(),
  coverImage: z
    .object({
      ZImage,
    })
    .optional(),
  blogContent: z
    .string()
    .nonempty({ message: 'Blog content must not be empty!' })
    .optional(),
  user: z.instanceof(Types.ObjectId).optional(),
  comments: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const BlogValidation = {
  CreateBlogZodSchema,
  UpdateBlogZodSchema,
}

export default BlogValidation
