import DashboardLayout from '@/components/layouts/DashboardLayout'
import AllBooks from '@/components/pages/dashboard/contents/book/AllBooks'
import { withAuth } from '@/utils/auth/withAuth'
import { ReactElement } from 'react-markdown/lib/react-markdown'

export default function AllBooksPage() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-3xl pt-3">All Books</h2>
      <p className="text-xl italic">
        Add / Update books as volunteer works so that other users / you can add
        summary later
      </p>
      <AllBooks />
    </section>
  )
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
