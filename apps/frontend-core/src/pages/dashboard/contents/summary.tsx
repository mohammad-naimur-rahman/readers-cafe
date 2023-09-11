import DashboardLayout from '@/components/layouts/DashboardLayout'
import SummaryCard from '@/components/pages/dashboard/contents/summary/SummaryCard'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetMySummariesQuery } from '@/redux/features/summary/summaryApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { ReactElement } from 'react'

export default function AllSummariesPage() {
  const { token } = getIdAndToken()
  const { isLoading, isError, error, data } = useGetMySummariesQuery({ token })

  if (isError) {
    return (
      <DashbaordErrorComponent
        errorMessage={(error as IError)?.data?.message}
      />
    )
  }

  return (
    <section>
      <h2 className="text-3xl pt-3">All Summaries</h2>
      {isLoading ? (
        <div className="grid grid-cols-4 gap-5 pt-5">
          {[0, 1, 2, 3, 4, 5, 6, 7].map(el => (
            <Skeleton className="h-[600px]" key={el} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 pt-5">
          {data?.data?.map(summary => (
            <SummaryCard key={summary._id} summary={summary} />
          ))}
        </div>
      )}
    </section>
  )
}

AllSummariesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="All Summaries | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
