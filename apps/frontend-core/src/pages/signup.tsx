import animationData from '@/assets/lottie/bookReading2.json'
import EmptyLayout from '@/components/layouts/Emptylayout'
import SignupForm from '@/components/pages/signup/SignupForm'
import { lottieDefaultOptions } from '@/constants/lottieDeafultOptions'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import Lottie from 'react-lottie'

export default function SignupPage() {
  const { query } = useRouter()
  return (
    <section className="container flex flex-col md:flex-row min-h-screen items-center gap-5">
      <div className="w-full order-2 md:order-1 md:w-1/2">
        <SignupForm query={query} />
      </div>
      <div className="w-full order-1 md:order-2 md:w-1/2">
        <div className="max-w-xs md:max-w-lg flex items-center justify-center mx-auto">
          <Lottie
            options={lottieDefaultOptions(animationData)}
            height="90%"
            width="90%"
          />
        </div>
      </div>
    </section>
  )
}

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout title="Signup | Reader's café">{page}</EmptyLayout>
}
