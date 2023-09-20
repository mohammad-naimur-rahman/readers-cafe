import DashboardLayout from '@/components/layouts/DashboardLayout'
import BlogCard from '@/components/pages/dashboard/contents/blog/BlogCard'
import { Input } from '@/components/ui/input'
import { useSearchResult } from '@/hooks/useSearchResult'
import { withAuth } from '@/utils/auth/withAuth'
import { Search } from 'lucide-react'
import { ReactElement } from 'react'
import { IBlog } from 'validation/types'

export default function UpdateBookPageIndex() {
  const { isSearching, handleInput, searchedData, searchValue } =
    useSearchResult<IBlog>('blogs/my-contents', true)

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-3xl pt-3">Update Blog</h2>
      <p>First select a blog</p>
      <Input
        placeholder="🔍  Search with Blog Title..."
        className="max-w-md"
        value={searchValue}
        onChange={handleInput}
      />
      {isSearching ? (
        <p className="text-xl italic flex items-center gap-2">
          <Search /> Searching...
        </p>
      ) : null}
      <div className="grid grid-cols-4 gap-5 pt-5">
        {searchedData?.map(blog => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

UpdateBookPageIndex.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Select A Summary | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
