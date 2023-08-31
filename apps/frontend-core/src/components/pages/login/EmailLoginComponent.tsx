import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { env } from '@/configs/env'
import auth from '@/lib/firebaseConfig'
import { manageUserData } from '@/utils/auth/manageUserData'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { IAuthUser } from 'validation/types'
import z from 'zod'

const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required!' }).email({
    message: 'Email is required!',
  }),
  password: z.string({ required_error: 'Password is required!' }).min(4, {
    message: 'Password must be at least 4 characters!',
  }),
})

export default function EmailLoginComponent() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    provider.setCustomParameters({
      admin: 'true',
    })
    try {
      const response: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const { user } = response
      if (user) {
        const token = await user.getIdToken()
        const result = await axios.post(
          `${env.NEXT_PUBLIC_apiUrl}/auth/login`,
          { email: user.email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (result?.data?.success) {
          toast.success('Logged in successfully!')
          const authData: IAuthUser = result?.data?.data
          manageUserData(authData)
        }
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2.5 justify-center w-full sm:w-[300px] lg:w-[350px] mx-auto max-w-[350px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
