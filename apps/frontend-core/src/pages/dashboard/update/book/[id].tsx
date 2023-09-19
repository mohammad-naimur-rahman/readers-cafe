import DashboardLayout from '@/components/layouts/DashboardLayout'
import { useGetBookQuery } from '@/redux/features/book/bookApi'
import { withAuth } from '@/utils/auth/withAuth'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export default function UpdateBookPage() {
  const { query } = useRouter()
  const { data } = useGetBookQuery(query.id)
  console.log(data?.data)
  return <div>UpdateBookPage</div>
}

UpdateBookPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Update book | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
