import { Types } from 'mongoose'
import { z } from 'zod'

const CreateCommentZodSchema = z.object({
  commentText: z
    .string()
    .nonempty({ message: 'Comment text is required and must not be empty!' }),
  user: z.instanceof(Types.ObjectId),
  content: z.instanceof(Types.ObjectId),
})

const UpdateCommentZodSchema = z.object({
  commentText: z
    .string()
    .nonempty({ message: 'Comment text must not be empty!' })
    .optional(),
  user: z.instanceof(Types.ObjectId).optional(),
  content: z.instanceof(Types.ObjectId).optional(),
})

const CommentValidation = {
  CreateCommentZodSchema,
  UpdateCommentZodSchema,
}

export default CommentValidation
