import { Types } from 'mongoose'
import { z } from 'zod'

const CreateDonationZodSchema = z.object({
  amount: z.number().positive({ message: 'Amount must be a positive number!' }),
  donorUser: z.instanceof(Types.ObjectId),
  receiverUser: z.instanceof(Types.ObjectId),
})

const UpdateDonationZodSchema = z.object({
  amount: z
    .number()
    .positive({ message: 'Amount must be a positive number!' })
    .optional(),
  donorUser: z.instanceof(Types.ObjectId).optional(),
  receiverUser: z.instanceof(Types.ObjectId).optional(),
})

const DonationValidation = {
  CreateDonationZodSchema,
  UpdateDonationZodSchema,
}

export default DonationValidation
