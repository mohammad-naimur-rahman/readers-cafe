import DashboardLayout from '@/components/layouts/DashboardLayout'
import { withAuth } from '@/utils/auth/withAuth'
import { ReactElement } from 'react-markdown/lib/react-markdown'

export default function AllBooksPage() {
  return <div>AllBooksPage</div>
}

AllBooksPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="All Books | Reader's café">{page}</DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
