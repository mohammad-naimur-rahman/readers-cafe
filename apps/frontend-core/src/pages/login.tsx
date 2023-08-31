import EmptyLayout from '@/components/layouts/Emptylayout'
import LoginForm from '@/components/pages/login/LoginForm'
import { lottieDefaultOptions } from '@/constants/lottieDeafultOptions'
import { ReactElement } from 'react'
import Lottie from 'react-lottie'
import animationData from '../../public/lottie/bookReading.json'

export default function LoginPage() {
  return (
    <section className="flex flex-col md:flex-row min-h-screen items-center">
      <div className="w-full md:w-1/2">
        <Lottie
          options={lottieDefaultOptions(animationData)}
          height="90%"
          width="90%"
        />
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
