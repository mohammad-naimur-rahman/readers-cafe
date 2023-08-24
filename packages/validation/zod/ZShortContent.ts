import { z } from 'zod'
import { ZImage } from './ZImage'

interface IImage {
  blurImage?: string
  thumbnail?: string
  poster?: string
}

const CreateShortContentZodSchema = z.object({
  caption: z
    .string()
    .nonempty({ message: 'Caption is required and must not be empty!' }),
  image: z
    .object({
      ZImage,
    })
    .optional(),
  user: z.string(),
  comments: z.array(z.string()).optional(),
})

const UpdateShortContentZodSchema = z.object({
  caption: z
    .string()
    .nonempty({ message: 'Caption must not be empty!' })
    .optional(),
  image: z
    .object({
      ZImage,
    })
    .optional(),
  user: z.string().optional(),
  comments: z.array(z.string()).optional(),
})

export const ShortContentValidation = {
  CreateShortContentZodSchema,
  UpdateShortContentZodSchema,
}
