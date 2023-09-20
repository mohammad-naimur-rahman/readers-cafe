import DashboardLayout from '@/components/layouts/DashboardLayout'
import ShortContentCard from '@/components/pages/dashboard/contents/shortContent/ShortContentCard'
import ShortContentFilterFields from '@/components/pages/dashboard/contents/shortContent/ShortContentFilterFields'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import DashboardPaginationFields from '@/components/ui/dashboard/common/DashboardPaginationFields'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import { initShortContentQueries } from '@/constants/dashboard/queryValues'
import { useGetMyShortContentsQuery } from '@/redux/features/shortContent/shortContentApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { qs } from '@/utils/formUtils/qs'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { ReactElement, useState } from 'react'

export default function ShortContentPage() {
  const { token } = getIdAndToken()
  const [query, setquery] = useState(initShortContentQueries)
  const [queryString, setqueryString] = useState(qs(initShortContentQueries))
  const { isFetching, isError, error, data } = useGetMyShortContentsQuery({
    token,
    query: queryString,
  })

  if (isError) {
    return (
      <DashbaordErrorComponent
        errorMessage={(error as IError)?.data?.message}
      />
    )
  }

  return (
    <section>
      <h2 className="text-3xl pt-3 px-2 text-center">All Short Contents</h2>

      <ShortContentFilterFields
        query={query}
        setquery={setquery}
        setqueryString={setqueryString}
      />

      {isFetching ? (
        <div className="grid grid-cols-4 gap-5 pt-5">
          {[0, 1, 2, 3, 4, 5, 6, 7].map(el => (
            <Skeleton className="h-[500px]" key={el} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 pt-5">
          {data?.data?.map(shortContent => (
            <ShortContentCard
              key={shortContent._id}
              shortContent={shortContent}
            />
          ))}
        </div>
      )}

      <DashboardPaginationFields
        query={query}
        setquery={setquery}
        data={data}
        setqueryString={setqueryString}
      />

      <NoContent
        isLoading={isFetching}
        data={data}
        content="Short Content"
        createNewLink="/dashboard/create/short-content"
      />
    </section>
  )
}

ShortContentPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="All Blogs | Reader's café">{page}</DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
