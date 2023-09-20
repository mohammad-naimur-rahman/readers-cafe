import DashboardLayout from '@/components/layouts/DashboardLayout'
import DiscussionCard from '@/components/pages/dashboard/contents/discussion/DiscussionCard'
import { Input } from '@/components/ui/input'
import { useSearchResult } from '@/hooks/useSearchResult'
import { withAuth } from '@/utils/auth/withAuth'
import { Search } from 'lucide-react'
import { ReactElement } from 'react'
import { IDiscussion } from 'validation/types'

export default function UpdateDiscussionPageIndex() {
  const { isSearching, handleInput, searchedData, searchValue } =
    useSearchResult<IDiscussion>('discussions/my-contents', true)

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-3xl pt-3">Update Discussion</h2>
      <p>First select a discussion</p>
      <Input
        placeholder="🔍  Search with Topic..."
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
        {searchedData?.map(discussion => (
          <DiscussionCard key={discussion._id} discussion={discussion} />
        ))}
      </div>
    </div>
  )
}

UpdateDiscussionPageIndex.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Select A Short Content | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
