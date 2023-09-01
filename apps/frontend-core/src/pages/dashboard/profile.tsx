import DashboardLayout from '@/components/layouts/DashboardLayout'
import { ReactElement } from 'react'

export default function ProfilePage() {
  return <section>h</section>
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Profile | Reader's café">{page}</DashboardLayout>
  )
}
