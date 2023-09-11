/* eslint-disable no-unsafe-optional-chaining */
import bookImage from '@/assets/images/book.png'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Img, { LocalImg } from '@/components/ui/img'
import { IBook, IGenre, IReview } from 'validation/types'

interface ISummaryFull {
  book: IBook
  reviews: IReview[]
}

interface Props {
  summary: ISummaryFull
}

export default function SummaryCard({ summary }: Props) {
  const { book }: ISummaryFull = summary
  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>
          <div className="flex py-1.5">
            {book?.authors?.map((author, i) => (
              <p key={author._id}>
                {author?.fullName}
                {book?.authors?.length - 1 !== i && <span>,&nbsp;</span>}
              </p>
            ))}
          </div>
          <p className="font-semibold text-primary">
            {(book?.genre as unknown as IGenre)?.genre}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-w-[200px] mx-auto">
          {book?.image ? (
            <Img src={book?.image} alt={book.title} className="aspect-book" />
          ) : (
            <LocalImg
              src={bookImage}
              alt={book.title}
              className="aspect-book"
            />
          )}
        </div>

        {book?.description ? (
          <p className="py-3 px-2">{book?.description}</p>
        ) : null}
      </CardContent>
      <CardFooter className="flex justify-between flex-wrap gap-2 py-5 px-2">
        <Button variant="default" size="sm">
          View Summary
        </Button>
        <Button variant="outline" size="sm">
          Update
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
