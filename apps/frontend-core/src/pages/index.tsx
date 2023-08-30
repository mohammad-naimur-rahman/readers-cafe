import RootLayout from '@/components/layouts/RootLayout'
import { ReactElement } from 'react'

export default function IndexPage() {
  return (
    <div>
      <h1>Hlle</h1>
    </div>
  )
}

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout title="Home">{page}</RootLayout>
}
