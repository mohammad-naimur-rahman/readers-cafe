import DashboardLayout from '@/components/layouts/DashboardLayout'
import BlogCard from '@/components/pages/dashboard/contents/blog/BlogCard'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetMyBlogsQuery } from '@/redux/features/blog/blogApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { ReactElement } from 'react'

export default function BlogPage() {
  const { token } = getIdAndToken()
  const { isLoading, isError, error, data } = useGetMyBlogsQuery({ token })

  if (isError) {
    return (
      <DashbaordErrorComponent
        errorMessage={(error as IError)?.data?.message}
      />
    )
  }

  return (
    <section>
      <h2 className="text-3xl pt-3">All Blogs</h2>
      {isLoading ? (
        <div className="grid grid-cols-4 gap-5 pt-5">
          {[0, 1, 2, 3, 4, 5, 6, 7].map(el => (
            <Skeleton className="h-[350px]" key={el} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 pt-5">
          {data?.data?.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
      <NoContent
        isLoading={isLoading}
        data={data}
        content="Blog"
        createNewLink="/dashboard/create/blog"
      />
    </section>
  )
}

BlogPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="All Blogs | Reader's café">{page}</DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
