import bookImage from '@/assets/images/book.png'
import Img, { LocalImg } from '@/components/ui/img'
import { IBook, IGenre } from 'validation/types'

interface Props {
  book: IBook
}

export default function SelectedBookCard({ book }: Props) {
  return (
    <div className="flex gap-5 cursor-pointer border rounded-md">
      <div className="w-20 h-36 flex items-center justify-center">
        {book?.image?.url ? (
          <Img src={book?.image} alt={book?.title} />
        ) : (
          <LocalImg src={bookImage} alt={book?.title} />
        )}
      </div>
      <div className="flex flex-col justify-around">
        <h4>{book?.title}</h4>
        <div className="flex gap-2 items-center text-sm">
          <p>Authors:</p>
          <div className="flex gap-2">
            {book?.authors?.map(author => (
              <p key={author?._id}>{author?.fullName}</p>
            ))}
          </div>
        </div>
        <p className="text-sm text-secondary-foreground">
          Genre: {(book?.genre as unknown as IGenre).genre}
        </p>
        {book?.publicationYear ? (
          <p className="text-sm text-secondary-foreground">
            Publication Year: {book?.publicationYear}
          </p>
        ) : null}
      </div>
    </div>
  )
}
