import { ZImage } from './ZImage'
import { Types } from 'mongoose'
import { z } from 'zod'

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
  user: z.instanceof(Types.ObjectId),
  comments: z.array(z.instanceof(Types.ObjectId)).optional(),
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
  user: z.instanceof(Types.ObjectId).optional(),
  comments: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const ShortContentValidation = {
  CreateShortContentZodSchema,
  UpdateShortContentZodSchema,
}

export default ShortContentValidation
