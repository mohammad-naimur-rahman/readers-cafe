/* eslint-disable no-unsafe-optional-chaining */
import bookImage from '@/assets/images/book.png'
import ButtonExtended from '@/components/ui/ButtonExtended'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Img, { LocalImg } from '@/components/ui/img'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formateDate'
import { ViewIcon } from 'lucide-react'
import Link from 'next/link'
import { IBook, IGenre, ISummary, IUser } from 'validation/types'
import { Button } from '../../button'

interface Props {
  summary: ISummary
  fixedSize?: boolean
}

export default function SummaryCard({ summary, fixedSize }: Props) {
  const { book } = summary
  const assertedBook = book as IBook
  const assertedGenres = assertedBook?.genre as unknown as IGenre[]

  return (
    <Card
      className={cn('bg-secondary', {
        'flex-shrink-0 w-96': fixedSize,
      })}
    >
      <CardHeader>
        <CardTitle>{assertedBook.title}</CardTitle>
        <div>
          <div className="flex py-1.5">
            {assertedBook?.authors?.map((author, i) => (
              <p key={author._id} className="text-muted-foreground text-sm">
                {author?.fullName}
                {assertedBook?.authors?.length - 1 !== i && (
                  <span>,&nbsp;</span>
                )}
              </p>
            ))}
          </div>
          <p className="font-semibold text-primary">
            {assertedGenres[0].genre}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[350px]">
          {assertedBook?.image?.url ? (
            <Img
              src={assertedBook?.image}
              alt={assertedBook.title}
              className="h-full w-auto mx-auto object-contain"
            />
          ) : (
            <LocalImg
              src={bookImage}
              alt={assertedBook.title}
              className="h-full w-auto mx-auto object-contain"
            />
          )}
        </div>

        <div className="px-2">
          <div className="flex items-center justify-between">
            <p>
              <span className="font-semibold">Total Reviews: </span>
              {summary.reviews.length}
            </p>
          </div>
        </div>
        {/* <div className="p-2">
          <ReactMarkdown className={styles.markdown}>
            {splitMarkdown(summary.content, 200)}
          </ReactMarkdown>
        </div> */}
        <div className="text-right px-3">
          <div className="flex items-center gap-1 justify-end">
            <p>By</p>
            <Button variant="link" className="p-0 m-0">
              <Link href={`users/${summary.user._id}`}>
                {(summary?.user as IUser)?.fullName}
              </Link>
            </Button>
          </div>
          <p>{formatDate(summary?.createdAt)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end flex-wrap gap-2 pb-2 pt-5 px-2">
        <Link href={`/summaries/${summary._id}`}>
          <ButtonExtended icon={<ViewIcon />}>View Summary</ButtonExtended>
        </Link>
      </CardFooter>
    </Card>
  )
}
