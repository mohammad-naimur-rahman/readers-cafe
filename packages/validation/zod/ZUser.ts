import { z } from 'zod'

const createUserValidationSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  profilePicture: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(['user', 'admin']).optional(),
  averageStarRating: z.number().optional(),
  summaries: z.array(z.string()),
  blogs: z.array(z.string()),
  discussions: z.array(z.string()),
  shortContents: z.array(z.string()),
  activities: z.array(z.string()),
  donations: z.array(z.string()),
  readingList: z.array(z.string()),
  socialMediaAccounts: z
    .object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      twitter: z.string().optional(),
      youtube: z.string().optional(),
      tiktok: z.string().optional(),
    })
    .optional(),
})

const updateUserValidationSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  profilePicture: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(['user', 'admin']).optional(),
  averageStarRating: z.number().min(0).optional(),
  summaries: z.array(z.string()).optional(),
  blogs: z.array(z.string()).optional(),
  discussions: z.array(z.string()).optional(),
  shortContents: z.array(z.string()).optional(),
  activities: z.array(z.string()).optional(),
  donations: z.array(z.string()).optional(),
  readingList: z.array(z.string()).optional(),
  socialMediaAccounts: z
    .object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      twitter: z.string().optional(),
      youtube: z.string().optional(),
      tiktok: z.string().optional(),
    })
    .optional(),
})

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
}
