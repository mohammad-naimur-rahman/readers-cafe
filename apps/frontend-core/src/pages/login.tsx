import animationData from '@/assets/lottie/bookReading3.json'
import EmptyLayout from '@/components/layouts/Emptylayout'
import LoginForm from '@/components/pages/login/LoginForm'
import { lottieDefaultOptions } from '@/constants/lottieDeafultOptions'
import { ReactElement } from 'react'
import Lottie from 'react-lottie'

export default function LoginPage() {
  return (
    <section className="container flex flex-col md:flex-row min-h-screen items-center gap-5">
      <div className="w-full md:w-1/2">
        <div className="max-w-xs md:max-w-lg flex items-center justify-center mx-auto">
          <Lottie
            options={lottieDefaultOptions(animationData, false)}
            height="90%"
            width="90%"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <LoginForm />
      </div>
    </section>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout title="Login | Reader's café">{page}</EmptyLayout>
}
