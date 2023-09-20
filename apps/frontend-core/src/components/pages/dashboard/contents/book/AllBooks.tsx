import ButtonExtended from '@/components/ui/ButtonExtended'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import DashboardPaginationFields from '@/components/ui/dashboard/common/DashboardPaginationFields'
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

export default function AllBooks() {
  const initBookQueries: IBookQueries = {
    search: '',
    title: '',
    publicationYear: '',
    genre: 'Fiction',
    author: '',
    sortBy: 'title',
    sortOrder: 'asc' as 'asc',
    page: 1,
    limit: 10,
  }

  const [query, setquery] = useState<IBookQueries>(initBookQueries)
  const [queryString, setqueryString] = useState('')

  const { isError, error, data, isFetching } = useGetBooksQuery(queryString)

  const searchBooks = e => {
    e.preventDefault()
    setqueryString('')
    const queryStr = qs({
      search: query.search,
      page: query.page,
      limit: query.limit,
    })
    setqueryString(queryStr)
  }

  const filterBooks = e => {
    e.preventDefault()
    setqueryString('')
    const { search, ...queryWithoutSearch } = query
    const queryStr = qs(queryWithoutSearch)
    setqueryString(queryStr)
  }

  const clearFields = () => {
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
      <form
        onSubmit={searchBooks}
        className="flex gap-2 my-3 max-w-4xl mx-auto"
      >
        <Input
          type="text"
          placeholder="Search by title, author, publication year and genre"
          name="search"
          value={query.search}
          onChange={e => setquery({ ...query, search: e.target.value })}
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

      <DashboardPaginationFields
        query={query}
        setquery={setquery}
        data={data}
        setqueryString={setqueryString}
      />

      <NoContent
        isLoading={isFetching}
        data={data}
        content="Book"
        createNewLink="/dashboard/create/book"
      />
    </div>
  )
}
