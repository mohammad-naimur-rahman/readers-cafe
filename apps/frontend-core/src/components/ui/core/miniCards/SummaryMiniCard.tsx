/* eslint-disable no-unsafe-optional-chaining */
import bookImage from '@/assets/images/book.png'
import { formatDate } from '@/utils/formateDate'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { MousePointerSquare } from 'lucide-react'
import Link from 'next/link'
import { IBook, IGenre, ISummary, IUser } from 'validation/types'
import ButtonExtended from '../../ButtonExtended'
import { Button } from '../../button'
import Img, { LocalImg } from '../../img'
import Typography from '../../typrgraphy'

interface Props {
  summary: ISummary
}

export default function SummaryMiniCard({ summary }: Props) {
  const { id } = getIdAndToken()
  const assertedBook = summary?.book as IBook
  return (
    <div className="p-3 bg-background rounded-sm">
      <Typography variant="body">{assertedBook?.title}</Typography>
      <div className="flex py-1.5">
        {assertedBook?.authors?.map((author, i) => (
          <p key={author._id} className="text-muted-foreground text-sm">
            {author?.fullName}
            {assertedBook?.authors?.length - 1 !== i && <span>,&nbsp;</span>}
          </p>
        ))}
      </div>
      <p className="text-primary font-semibold">
        {(assertedBook?.genre as unknown as IGenre).genre}
      </p>
      <div className="h-[250px]">
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

      <p className="flex justify-end items-center gap-2">
        <span className="font-semibold">Total Reviews: </span>
        {summary?.reviews?.length}
      </p>
      <div className="text-right">
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
        <p className="pb-3">{formatDate(summary?.createdAt)}</p>

        <Link href={`/summaries/${summary._id}`}>
          <ButtonExtended icon={<MousePointerSquare />}>
            View Summary
          </ButtonExtended>
        </Link>
      </div>
    </div>
  )
}
