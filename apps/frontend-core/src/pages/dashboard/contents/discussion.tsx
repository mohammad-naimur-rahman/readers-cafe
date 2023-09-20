import DashboardLayout from '@/components/layouts/DashboardLayout'
import DiscussionCard from '@/components/pages/dashboard/contents/discussion/DiscussionCard'
import DiscussionFilterFields from '@/components/pages/dashboard/contents/discussion/DiscussionFilterFields'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import DashboardPaginationFields from '@/components/ui/dashboard/common/DashboardPaginationFields'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import { initDiscussionQueries } from '@/constants/dashboard/queryValues'
import { useGetMyDiscussionsQuery } from '@/redux/features/discussion/discussionApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { qs } from '@/utils/formUtils/qs'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { ReactElement, useState } from 'react'

export default function DiscussionPage() {
  const { token } = getIdAndToken()
  const [query, setquery] = useState(initDiscussionQueries)
  const [queryString, setqueryString] = useState(qs(initDiscussionQueries))
  const { isFetching, isError, error, data } = useGetMyDiscussionsQuery({
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
      <h2 className="text-3xl pt-3 text-center">All Discussions</h2>

      <DiscussionFilterFields
        query={query}
        setquery={setquery}
        setqueryString={setqueryString}
      />

      {isFetching ? (
        <div className="grid grid-cols-4 gap-5 pt-5">
          {[0, 1, 2, 3, 4, 5, 6, 7].map(el => (
            <Skeleton className="h-[350px]" key={el} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 pt-5">
          {data?.data?.map(discussion => (
            <DiscussionCard key={discussion._id} discussion={discussion} />
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
        content="Discussion"
        createNewLink="/dashboard/create/discussion"
      />
    </section>
  )
}

DiscussionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="All Discussions | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
