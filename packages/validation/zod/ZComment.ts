import { Types } from 'mongoose'
import { z } from 'zod'

const CreateCommentZodSchema = z.object({
  commentText: z
    .string()
    .nonempty({ message: 'Comment text is required and must not be empty!' }),
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
