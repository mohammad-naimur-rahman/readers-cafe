import DashboardLayout from '@/components/layouts/DashboardLayout'
import SummaryCard from '@/components/pages/dashboard/contents/summary/SummaryCard'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetMySummariesQuery } from '@/redux/features/summary/summaryApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { ReactElement, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function AllSummariesPage() {
  const { token } = getIdAndToken()
  const [search, setsearch] = useState('')
  const [debouncedValue] = useDebounce(search, 500)
  const { isLoading, isError, error, data } = useGetMySummariesQuery({
    token,
    query: debouncedValue ? `search=${debouncedValue}` : null,
  })

  if (isError) {
    return (
      <DashbaordErrorComponent
        errorMessage={(error as IError)?.data?.message}
      />
    )
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-3xl pt-3">All Summaries</h2>
      <Input
        value={search}
        onChange={e => setsearch(e.target.value)}
        placeholder="🔍  Search with Book Title"
        className="mt-3 max-w-sm"
      />
      {isLoading ? (
        <div className="grid grid-cols-4 gap-5 pt-5">
          {[0, 1, 2, 3, 4, 5, 6, 7].map(el => (
            <Skeleton className="h-[580px]" key={el} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 pt-5">
          {data?.data?.map(summary => (
            <SummaryCard key={summary._id} summary={summary} />
          ))}
        </div>
      )}

      <NoContent
        isLoading={isLoading}
        data={data}
        content="Summary"
        createNewLink="/dashboard/create/summary"
      />
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
