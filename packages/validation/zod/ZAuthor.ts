import { Types } from 'mongoose'
import { z } from 'zod'

const CreateAuthorZodSchema = z.object({
  fullName: z
    .string()
    .nonempty({ message: 'Full name is required and must not be empty!' }),
  books: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const UpdateAuthorZodSchema = z.object({
  fullName: z.string().optional(),
  books: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const AuthorValidation = {
  CreateAuthorZodSchema,
  UpdateAuthorZodSchema,
}

export default AuthorValidation
