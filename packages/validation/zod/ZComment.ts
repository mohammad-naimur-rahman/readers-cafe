import { z } from 'zod'
import { commentForEnumArray } from '../constants/commentForEnumArray'

const CreateCommentZodSchema = z.object({
  commentText: z
    .string()
    .nonempty({ message: 'Comment text is required and must not be empty!' }),
  commentFor: z.enum([...commentForEnumArray] as [string, ...string[]]),
  user: z.string(),
  shortContent: z.string().optional(),
  discussion: z.string().optional(),
  blog: z.string().optional(),
})

const UpdateCommentZodSchema = z.object({
  commentText: z
    .string()
    .nonempty({ message: 'Comment text must not be empty!' })
    .optional(),
  commentFor: z
    .enum([...commentForEnumArray] as [string, ...string[]])
    .optional(),
  user: z.string().optional(),
  shortContent: z.string().optional(),
  discussion: z.string().optional(),
  blog: z.string().optional(),
})

export const CommentValidation = {
  CreateCommentZodSchema,
  UpdateCommentZodSchema,
}
