import Img from '@/components/ui/img'
import { IBook } from 'validation/types'

interface Props {
  book: IBook
}

export default function SearchBookCard({ book }: Props) {
  return (
    <div className="flex gap-5 cursor-pointer shadow-md">
      <div className="w-14 h-20 border flex items-center justify-center">
        {book?.image?.url ? (
          <Img src={book?.image} alt={book?.title} />
        ) : (
          <p className="text-xs text-center">No image available</p>
        )}
      </div>
      <div className="flex flex-col justify-around">
        <h4>{book?.title}</h4>
        <div className="flex gap-2 items-center text-sm">
          <p>Authors:</p>
          <div className="flex gap-2">
            {book?.authors?.map(author => (
              <p>{author?.fullName}</p>
            ))}
          </div>
        </div>
        <p className="text-sm text-secondary-foreground">
          Publication Year: {book?.publicationYear}
        </p>
      </div>
    </div>
  )
}
