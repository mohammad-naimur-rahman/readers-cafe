/* eslint-disable no-unsafe-optional-chaining */
import bookImage from '@/assets/images/book.png'
import ButtonExtended from '@/components/ui/ButtonExtended'
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
import { Trash2 } from 'lucide-react'
import { IBook, IGenre, IReview, ISummary } from 'validation/types'
import ViewSummary from './ViewSummary'

interface ISummaryFull {
  book: IBook
  reviews: IReview[]
  content: string
  rest: ISummary
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

        <div className="px-2">
          <div className="flex items-center justify-between">
            <p>
              <span className="font-semibold">Total Reviews: </span>
              {summary.reviews.length}
            </p>
            {summary.reviews.length > 0 ? (
              <Button size="sm">View all reviews</Button>
            ) : null}

            {/* TODO: Add star rating on the top, position absolute */}
            {summary.reviews.length > 0 ? (
              <p>
                <span className="font-semibold">Average Star Rating: </span>
                {summary.rest.averageStarRating}
              </p>
            ) : null}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between flex-wrap gap-2 pb-2 pt-5 px-2">
        <ViewSummary summary={summary.content} />
        <ButtonExtended icon={<Trash2 />} variant="destructive" size="sm">
          Delete Summary
        </ButtonExtended>
      </CardFooter>
    </Card>
  )
}
