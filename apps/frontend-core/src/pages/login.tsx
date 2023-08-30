import EmptyLayout from '@/components/layouts/Emptylayout'
import LoginForm from '@/components/pages/login/LoginForm'
import Img from '@/components/ui/img'
import { ReactElement } from 'react'

export default function LoginPage() {
  return (
    <section className="flex min-h-screen items-center">
      <div className="w-1/2">
        <Img src="/images/authPage/login.png" alt="login image" />
      </div>
      <div className="w-1/2">
        <LoginForm />
      </div>
    </section>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout title="Login">{page}</EmptyLayout>
}
