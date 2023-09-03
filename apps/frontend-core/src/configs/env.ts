import z from 'zod'

const EnvSchema = z.object({
  NEXT_PUBLIC_apiUrl: z.string().nonempty(),
  NEXT_PUBLIC_apiKey: z.string().nonempty(),
  NEXT_PUBLIC_authDomain: z.string().nonempty(),
  NEXT_PUBLIC_projectId: z.string().nonempty(),
  NEXT_PUBLIC_storageBucket: z.string().nonempty(),
  NEXT_PUBLIC_messagingSenderId: z.string().nonempty(),
  NEXT_PUBLIC_appId: z.string().nonempty(),
  NEXT_PUBLIC_measurementId: z.string().nonempty(),
  NEXT_PUBLIC_facebookAppId: z.string().nonempty(),
  NEXT_PUBLIC_facebookAppSecret: z.string().nonempty(),
  NEXT_PUBLIC_uploadPreset: z.string().nonempty(),
  NEXT_PUBLIC_cloudName: z.string().nonempty(),
})

export const env = EnvSchema.parse({
  NEXT_PUBLIC_apiUrl: process.env.NEXT_PUBLIC_apiUrl,
  NEXT_PUBLIC_apiKey: process.env.NEXT_PUBLIC_apiKey,
  NEXT_PUBLIC_authDomain: process.env.NEXT_PUBLIC_authDomain,
  NEXT_PUBLIC_projectId: process.env.NEXT_PUBLIC_projectId,
  NEXT_PUBLIC_storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  NEXT_PUBLIC_messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  NEXT_PUBLIC_appId: process.env.NEXT_PUBLIC_appId,
  NEXT_PUBLIC_measurementId: process.env.NEXT_PUBLIC_measurementId,
  NEXT_PUBLIC_facebookAppId: process.env.NEXT_PUBLIC_facebookAppId,
  NEXT_PUBLIC_facebookAppSecret: process.env.NEXT_PUBLIC_facebookAppSecret,
  NEXT_PUBLIC_uploadPreset: process.env.NEXT_PUBLIC_uploadPreset,
  NEXT_PUBLIC_cloudName: process.env.NEXT_PUBLIC_cloudName,
})
