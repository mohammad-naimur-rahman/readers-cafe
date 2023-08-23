import { z } from 'zod'

export const authValidationZodSchema = z.object({
  email: z.string().nonempty({
    message: 'Email is required',
  }),
  fullName: z.string().nonempty({
    message: 'Name is required',
  }),
})
