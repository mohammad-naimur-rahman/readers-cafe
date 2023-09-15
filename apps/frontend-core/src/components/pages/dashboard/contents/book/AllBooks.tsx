import { Button } from '@/components/ui/button'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetBooksQuery } from '@/redux/features/book/bookApi'
import { IError } from '@/types/IError'
import { IBookQueries } from '@/types/queries/IBookQueries'
import { qs } from '@/utils/formUtils/qs'
import { useState } from 'react'
import BookCard from './BookCard'
import BookFilterInputs from './BookFilterInputs'

export default function AllBooks() {
  const initBookQueries = {
    search: '',
    publicationYear: '',
    genre: '',
    author: '',
    limit: 5,
    page: 1,
    sortBy: 'title',
    sortOrder: 'asc' as 'asc',
  }

  const [query, setquery] = useState<IBookQueries>(initBookQueries)

  const { isLoading, isError, error, data } = useGetBooksQuery(undefined)

  const searchBooks = e => {
    e.preventDefault()
    const queryStr = qs(query)
    console.log(queryStr)
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
      <form onSubmit={searchBooks}>
        <BookFilterInputs query={query} setquery={setquery} />
        <Button>Search</Button>
      </form>
      {isLoading ? (
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
      <NoContent
        isLoading={isLoading}
        data={data}
        content="Book"
        createNewLink="/dashboard/create/book"
      />
    </div>
  )
}
