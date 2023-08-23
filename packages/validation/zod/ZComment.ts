import { Types } from 'mongoose'
import { z } from 'zod'
import { commentForEnumArray } from '../constants/commentForEnumArray'

const CreateCommentZodSchema = z.object({
  commentText: z
    .string()
    .nonempty({ message: 'Comment text is required and must not be empty!' }),
  commentFor: z.enum([...commentForEnumArray] as [string, ...string[]]),
  user: z.instanceof(Types.ObjectId),
  shortContent: z.instanceof(Types.ObjectId).optional(),
  discussion: z.instanceof(Types.ObjectId).optional(),
  blog: z.instanceof(Types.ObjectId).optional(),
})

const UpdateCommentZodSchema = z.object({
  commentText: z
    .string()
    .nonempty({ message: 'Comment text must not be empty!' })
    .optional(),
  commentFor: z
    .enum([...commentForEnumArray] as [string, ...string[]])
    .optional(),
  user: z.instanceof(Types.ObjectId).optional(),
  shortContent: z.instanceof(Types.ObjectId).optional(),
  discussion: z.instanceof(Types.ObjectId).optional(),
  blog: z.instanceof(Types.ObjectId).optional(),
})

const CommentValidation = {
  CreateCommentZodSchema,
  UpdateCommentZodSchema,
}

export default CommentValidation
