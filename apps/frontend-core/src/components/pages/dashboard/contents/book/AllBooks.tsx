import ButtonExtended from '@/components/ui/ButtonExtended'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetBooksQuery } from '@/redux/features/book/bookApi'
import { IError } from '@/types/IError'
import { IBookQueries } from '@/types/queries/IBookQueries'
import { qs } from '@/utils/formUtils/qs'
import { Eraser, Filter, Search } from 'lucide-react'
import { useState } from 'react'
import BookCard from './BookCard'
import BookFilterInputs from './BookFilterInputs'
import PaginationFields from './PaginationFields'

export default function AllBooks() {
  const initBookQueries = {
    publicationYear: '',
    genre: '',
    author: '',
    limit: 5,
    page: 1,
    sortBy: 'title',
    sortOrder: 'asc' as 'asc',
  }

  const initPagination = {
    limit: 5,
    page: 1,
  }

  const paginationStr = qs(initPagination)

  const [query, setquery] = useState<IBookQueries>(initBookQueries)
  const [searchQuery, setsearchQuery] = useState('')
  const [queryString, setqueryString] = useState(paginationStr)

  const { isError, error, data, isFetching } = useGetBooksQuery(queryString)

  const searchBooks = e => {
    e.preventDefault()
    setqueryString('')
    const queryStr = qs({
      search: searchQuery,
    })
    setqueryString(queryStr)
  }

  const filterBooks = e => {
    e.preventDefault()
    setqueryString('')
    const queryStr = qs(query)
    setqueryString(queryStr)
  }

  const clearFields = () => {
    setsearchQuery('')
    setquery(initBookQueries)
    setqueryString('')
  }

  if (isError) {
    return (
      <DashbaordErrorComponent
        errorMessage={(error as IError)?.data?.message}
      />
    )
  }

  return (
    <div>
      <form onSubmit={searchBooks} className="flex gap-3 my-3">
        <Input
          type="text"
          placeholder="Search by title, author, publication year and genre"
          name="search"
          value={searchQuery}
          onChange={e => setsearchQuery(e.target.value)}
        />
        <ButtonExtended icon={<Search />}>Search Books</ButtonExtended>
        <ButtonExtended
          type="button"
          variant="destructive"
          icon={<Eraser />}
          onClick={clearFields}
        >
          Clear Search
        </ButtonExtended>
      </form>
      <form
        onSubmit={filterBooks}
        className="flex w-full gap-2 mt-5 [&>*]:max-w-xs"
      >
        <BookFilterInputs query={query} setquery={setquery} />
        <ButtonExtended icon={<Filter />}>Filter Books</ButtonExtended>
        <ButtonExtended
          type="button"
          variant="destructive"
          icon={<Eraser />}
          onClick={clearFields}
        >
          Clear Filter
        </ButtonExtended>
      </form>
      {isFetching ? (
        <div className="card-container">
          {[0, 1, 2, 3, 4, 5, 6, 7].map(el => (
            <div className="p-2" key={el}>
              <Skeleton className="h-[670px]" />
            </div>
          ))}
        </div>
      ) : (
        <div className="card-container">
          {data?.data?.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      <PaginationFields data={data?.meta} />

      <NoContent
        isLoading={isFetching}
        data={data}
        content="Book"
        createNewLink="/dashboard/create/book"
      />
    </div>
  )
}
