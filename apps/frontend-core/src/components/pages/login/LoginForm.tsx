import logo from '@/assets/logo/logo.png'
import { Button } from '@/components/ui/button'
import { LocalImg } from '@/components/ui/img'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import EmailLoginComponent from './EmailLoginComponent'
import FacookLoginComponent from './FacookLoginComponent'
import GoogleLoginComponent from './GoogleLoginComponent'

interface Props {
  query: {
    redirected?: boolean
    prevPath?: string
  }
}

export default function LoginForm({ query }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <section>
      <div className="flex justify-center items-center w-full mx-auto">
        <h2 className="text-3xl text-center mr-3">Login</h2>
        <LocalImg src={logo} alt="Reader's Café" className="w-[180px]" />
      </div>
      <p className="text-muted-foreground text-center py-5">
        Enter your information below to login to your account
      </p>

      <EmailLoginComponent
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        query={query}
      />

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
        <GoogleLoginComponent
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          query={query}
        />
        <FacookLoginComponent
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          query={query}
        />
      </section>
      <p className="flex items-center justify-center py-3">
        Don&apos;t have an account?
        {query?.redirected ? (
          <Link
            href={`/signup?redirected=${query.redirected}&prevPath=${query.prevPath}`}
          >
            <Button variant="link">Signup</Button>
          </Link>
        ) : (
          <Link href="/signup">
            <Button variant="link">Signup</Button>
          </Link>
        )}
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
