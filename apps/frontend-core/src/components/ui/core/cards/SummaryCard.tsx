/* eslint-disable no-unsafe-optional-chaining */
import bookImage from '@/assets/images/book.png'
import ButtonExtended from '@/components/ui/ButtonExtended'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Img, { LocalImg } from '@/components/ui/img'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formateDate'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { MousePointerSquare } from 'lucide-react'
import Link from 'next/link'
import { IBook, IGenre, ISummary, IUser } from 'validation/types'
import { Button } from '../../button'

interface Props {
  summary: ISummary
  fixedSize?: boolean
  className?: string
}

export default function SummaryCard({ summary, fixedSize, className }: Props) {
  const { id } = getIdAndToken()
  const { book } = summary
  const assertedBook = book as IBook
  const assertedGenres = assertedBook?.genre as unknown as IGenre[]

  return (
    <Card
      className={cn(
        {
          'flex-shrink-0 w-96': fixedSize,
        },
        'shadow-xl border-0 flex flex-col justify-between',
        className,
      )}
    >
      <div>
        <CardHeader className="p-4">
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
      </div>

      <div>
        <p className="flex justify-end items-center gap-2 px-3">
          <span className="font-semibold">Total Reviews: </span>
          {summary?.reviews?.length}
        </p>
        <div className="text-right px-3">
          <div className="flex items-center gap-1 justify-end">
            <p className="font-semibold">By</p>
            {summary?.user?._id === id ? (
              <Button variant="link" className="p-0 m-0">
                <Link href="dashboard/profile">You</Link>
              </Button>
            ) : (
              <Button variant="link" className="p-0 m-0">
                <Link href={`users/${summary.user._id}`}>
                  {(summary?.user as IUser)?.fullName}
                </Link>
              </Button>
            )}
          </div>
          <p>{formatDate(summary?.createdAt)}</p>

          <CardFooter className="flex justify-end flex-wrap gap-2 pb-3 pt-3 px-0">
            <Link href={`/summaries/${summary._id}`}>
              <ButtonExtended icon={<MousePointerSquare />}>
                View Summary
              </ButtonExtended>
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
