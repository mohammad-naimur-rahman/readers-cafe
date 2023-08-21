import { Types } from 'mongoose'
import { z } from 'zod'

const createUserValidationSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  profilePicture: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(['user', 'admin']).optional(),
  averageStarRating: z.number().optional(),
  summaries: z.array(z.instanceof(Types.ObjectId)),
  blogs: z.array(z.instanceof(Types.ObjectId)),
  discussions: z.array(z.instanceof(Types.ObjectId)),
  shortContents: z.array(z.instanceof(Types.ObjectId)),
  activities: z.array(z.instanceof(Types.ObjectId)),
  donations: z.array(z.instanceof(Types.ObjectId)),
  readingList: z.array(z.instanceof(Types.ObjectId)),
})

const updateUserValidationSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  profilePicture: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(['user', 'admin']).optional(),
  averageStarRating: z.number().min(0).optional(),
  summaries: z.array(z.instanceof(Types.ObjectId)).optional(),
  blogs: z.array(z.instanceof(Types.ObjectId)).optional(),
  discussions: z.array(z.instanceof(Types.ObjectId)).optional(),
  shortContents: z.array(z.instanceof(Types.ObjectId)).optional(),
  activities: z.array(z.instanceof(Types.ObjectId)).optional(),
  donations: z.array(z.instanceof(Types.ObjectId)).optional(),
  readingList: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
}

export default UserValidation
