import logo from '@/assets/logo/logo.png'
import { Button } from '@/components/ui/button'
import { LocalImg } from '@/components/ui/img'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import EmailSignupComponent from './EmailSignupComponent'
import FacookSignupComponent from './FacebookSignupComponent'
import GoogleSignupComponent from './GoogleSignupComponent'

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <section>
      <div className="flex justify-center items-center w-full mx-auto">
        <h2 className="text-3xl text-center mr-3">Signup</h2>
        <LocalImg src={logo} alt="Reader's Café" className="w-[180px]" />
      </div>
      <p className="text-muted-foreground text-center py-5">
        Enter your information below to create your account
      </p>
      <EmailSignupComponent isLoading={isLoading} setIsLoading={setIsLoading} />

      <section className="flex flex-col mx-auto gap-3 w-full sm:w-[300px] lg:w-[350px] max-w-[350px]">
        <div className="relative py-3 mt-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <GoogleSignupComponent
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <FacookSignupComponent
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </section>
      <p className="flex items-center justify-center py-3">
        Already have an account?
        <Link href="/login">
          <Button variant="link">Login</Button>
        </Link>
      </p>
      <div className="flex pb-3 justify-center">
        <Link href="/">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" /> Go back home
          </Button>
        </Link>
      </div>
    </section>
  )
}
