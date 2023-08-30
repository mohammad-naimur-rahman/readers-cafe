import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import FacebookIcon from './FacebookIcon'
import GoogleIcon from './GoogleIcon'

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-5 justify-center text-center">
      <h2 className="text-2xl">Login | Reader&apos;s Café</h2>
      <p className="text-muted-foreground">
        Enter your information below to create your account
      </p>

      <section className="flex flex-col mx-auto gap-2.5 w-[350px]">
        <Input type="email" placeholder="Enter your email" />
        <Input type="password" placeholder="Enter your password" />
        <Button variant="default" className="block w-full">
          Login
        </Button>

        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button variant="outline" className="block w-full">
          <GoogleIcon />
        </Button>
        <Button variant="outline" className="block w-full">
          <FacebookIcon />
        </Button>
      </section>
      <p className="flex items-center justify-center">
        Don&apos;t have an account?
        <Link href="/signup">
          <Button variant="link">Signup</Button>
        </Link>
      </p>
      <Link href="/">
        <Button variant="secondary">
          <ArrowLeft className="w-4 h-4 mr-2" /> Go back home
        </Button>
      </Link>
    </form>
  )
}
