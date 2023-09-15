import DashboardLayout from '@/components/layouts/DashboardLayout'
import BookCard from '@/components/pages/dashboard/contents/book/BookCard'
import { Input } from '@/components/ui/input'
import { useSearchResult } from '@/hooks/useSearchResult'
import { withAuth } from '@/utils/auth/withAuth'
import { Search } from 'lucide-react'
import { ReactElement } from 'react'
import { IBook } from 'validation/types'

export default function UpdateBookPageIndex() {
  const { isSearching, handleInput, searchedData, searchValue } =
    useSearchResult<IBook>('books', true)

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-3xl pt-3">Update Book</h2>
      <p>First select a book</p>
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
        {searchedData?.map(book => (
          <BookCard key={book._id} book={book} />
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
