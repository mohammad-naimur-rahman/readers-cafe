import DashboardLayout from '@/components/layouts/DashboardLayout'
import SummaryCard from '@/components/pages/dashboard/contents/summary/SummaryCard'
import { Input } from '@/components/ui/input'
import { useSearchResult } from '@/hooks/useSearchResult'
import { withAuth } from '@/utils/auth/withAuth'
import { Search } from 'lucide-react'
import { ReactElement } from 'react'
import { ISummary } from 'validation/types'

export default function UpdateSummaryPageIndex() {
  const { isSearching, handleInput, searchedData, searchValue } =
    useSearchResult<ISummary>('summaries/my-contents', true)

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-3xl pt-3">Update Summary</h2>
      <Input
        placeholder="🔍  Search with Book Title..."
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
        {searchedData?.map(summary => (
          <SummaryCard key={summary._id} summary={summary} />
        ))}
      </div>
    </div>
  )
}

UpdateSummaryPageIndex.getLayout = function getLayout(page: ReactElement) {
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
