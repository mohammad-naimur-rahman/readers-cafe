/* eslint-disable no-unsafe-optional-chaining */
import bookImage from '@/assets/images/book.png'
import ButtonExtended from '@/components/ui/ButtonExtended'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Img, { LocalImg } from '@/components/ui/img'
import { cn } from '@/lib/utils'
import styles from '@/styles/markdown.module.scss'
import { splitMarkdown } from '@/utils/splitMarkdown'
import { ViewIcon } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { IBook, IGenre, ISummary } from 'validation/types'
import { Button } from '../../button'

interface Props {
  summary: ISummary
  fixedSize?: boolean
  showAll?: boolean
}

export default function SummaryCard({ summary, fixedSize, showAll }: Props) {
  const { book } = summary
  const assertedBook = book as IBook
  const assertedGenres = assertedBook?.genre as unknown as IGenre[]

  return (
    <Card
      className={cn('w-96 bg-secondary', {
        'flex-shrink-0 w-96': fixedSize,
      })}
    >
      {showAll ? (
        <div className="flex items-center justify-center h-full">
          <Link href="/summaries">
            <Button variant="link" className="text-lg">
              Show all summaries
            </Button>
          </Link>
        </div>
      ) : (
        <>
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
          <section className="p-0">
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
            <div className="p-2">
              <ReactMarkdown className={styles.markdown}>
                {splitMarkdown(summary.content, 200)}
              </ReactMarkdown>
            </div>
          </section>
          <CardFooter className="flex justify-end flex-wrap gap-2 pb-2 pt-5 px-2">
            <Link href={`/summaries/${summary._id}`}>
              <ButtonExtended icon={<ViewIcon />}>View Summary</ButtonExtended>
            </Link>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
