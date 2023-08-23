import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['production', 'development']),
  PORT: z.string().nonempty(),
  DATABASE_URL: z.string().nonempty(),
  FIREBASE_ADMIN_TYPE: z.string().nonempty(),
  FIREBASE_ADMIN_PROJECT_ID: z.string().nonempty(),
  FIREBASE_ADMIN_PRIVATE_KEY_ID: z.string().nonempty(),
  FIREBASE_ADMIN_PRIVATE_KEY: z.string().nonempty(),
  FIREBASE_ADMIN_CLIENT_EMAIL: z.string().nonempty(),
  FIREBASE_ADMIN_CLIENT_ID: z.string().nonempty(),
  FIREBASE_ADMIN_AUTH_URI: z.string().nonempty(),
  FIREBASE_ADMIN_TOKEN_URI: z.string().nonempty(),
  FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL: z.string().nonempty(),
  FIREBASE_ADMIN_CLIENT_X509_CERT_URL: z.string().nonempty(),
  FIREBASE_ADMIN_UNIVERSE_DOMAIN: z.string().nonempty(),
})

export const env = EnvSchema.parse(process.env)
