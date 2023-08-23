import { ZNExtEnvSchema } from 'validation/zod/ZNextEnvSchema'

export const env = ZNExtEnvSchema.parse(process.env)
