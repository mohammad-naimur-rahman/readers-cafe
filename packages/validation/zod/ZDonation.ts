import { z } from 'zod'

const CreateDonationZodSchema = z.object({
  amount: z.number().positive({ message: 'Amount must be a positive number!' }),
  donorUser: z.string(),
  receiverUser: z.string(),
})

const UpdateDonationZodSchema = z.object({
  amount: z
    .number()
    .positive({ message: 'Amount must be a positive number!' })
    .optional(),
  donorUser: z.string().optional(),
  receiverUser: z.string().optional(),
})

export const DonationValidation = {
  CreateDonationZodSchema,
  UpdateDonationZodSchema,
}
