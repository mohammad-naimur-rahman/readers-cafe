import DashboardLayout from '@/components/layouts/DashboardLayout'
import DiscussionCard from '@/components/pages/dashboard/contents/discussion/DiscussionCard'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetMyDiscussionsQuery } from '@/redux/features/discussion/discussionApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { ReactElement } from 'react'

export default function DiscussionPage() {
  const { token } = getIdAndToken()
  const { isLoading, isError, error, data } = useGetMyDiscussionsQuery({
    token,
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
      <h2 className="text-3xl pt-3">All Discussions</h2>
      {isLoading ? (
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
