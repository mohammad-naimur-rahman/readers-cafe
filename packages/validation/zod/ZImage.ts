import { z } from 'zod'

export const ZImage = z.object({
  url: z.string(),
  dominantColor: z.string(),
})
