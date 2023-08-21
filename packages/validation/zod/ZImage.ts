import { z } from 'zod'

export const ZImage = z.object({
  blurImage: z.string().url().optional(),
  thumbnail: z.string().url().optional(),
  poster: z.string().url().optional(),
})
