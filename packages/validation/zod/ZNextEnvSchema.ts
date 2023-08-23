import z from 'zod'

export const ZNExtEnvSchema = z.object({
  NEXT_PUBLIC_apiUrl: z.string().nonempty(),
  NEXT_PUBLIC_apiKey: z.string().nonempty(),
  NEXT_PUBLIC_authDomain: z.string().nonempty(),
  NEXT_PUBLIC_projectId: z.string().nonempty(),
  NEXT_PUBLIC_storageBucket: z.string().nonempty(),
  NEXT_PUBLIC_messagingSenderId: z.string().nonempty(),
  NEXT_PUBLIC_appId: z.string().nonempty(),
  NEXT_PUBLIC_measurementId: z.string().nonempty(),
})
