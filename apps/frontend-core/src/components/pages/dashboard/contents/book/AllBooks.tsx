import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetBooksQuery } from '@/redux/features/book/bookApi'
import { IError } from '@/types/IError'
import BookCard from './BookCard'

export default function AllBooks() {
  const { isLoading, isError, error, data } = useGetBooksQuery(undefined)

  if (isError) {
    return (
      <DashbaordErrorComponent
        errorMessage={(error as IError)?.data?.message}
      />
    )
  }

  return (
    <div>
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
