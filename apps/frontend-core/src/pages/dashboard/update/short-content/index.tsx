import DashboardLayout from '@/components/layouts/DashboardLayout'
import ShortContentCard from '@/components/pages/dashboard/contents/shortContent/ShortContentCard'
import { Input } from '@/components/ui/input'
import { useSearchResult } from '@/hooks/useSearchResult'
import { withAuth } from '@/utils/auth/withAuth'
import { Search } from 'lucide-react'
import { ReactElement } from 'react'
import { IShortContent } from 'validation/types'

export default function UpdateShortContentPageIndex() {
  const { isSearching, handleInput, searchedData, searchValue } =
    useSearchResult<IShortContent>('short-contents/my-contents', true)

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-3xl pt-3">Update Short Content</h2>
      <p>First select a content</p>
      <Input
        placeholder="🔍  Search with Caption..."
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
        {searchedData?.map(shortContent => (
          <ShortContentCard
            key={shortContent._id}
            shortContent={shortContent}
          />
        ))}
      </div>
    </div>
  )
}

UpdateShortContentPageIndex.getLayout = function getLayout(page: ReactElement) {
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
