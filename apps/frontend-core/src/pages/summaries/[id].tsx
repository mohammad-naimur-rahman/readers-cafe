/* eslint-disable no-unsafe-optional-chaining */
import RootLayout from '@/components/layouts/RootLayout'
import PostReviewForm from '@/components/pages/summaries/PostReviewForm'
import Review from '@/components/pages/summaries/Review'
import { Button } from '@/components/ui/button'
import SummaryMiniCard from '@/components/ui/core/miniCards/SummaryMiniCard'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typrgraphy'
import styles from '@/styles/summaryDetailsPage.module.scss'
import { fetcher } from '@/utils/fetcher'
import { getIdAndToken } from '@/utils/getIdAndToken'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { IBook, IGenre, IReview, ISummary } from 'validation/types'

interface Props {
  summary: {
    data: ISummary
  }
  sameUserSummaries: ISummary[]
  sameGenreSummaries: ISummary[]
  sameBookSummaries: ISummary[]
}

export default function SummaryDetailsPage({
  summary,
  sameUserSummaries,
  sameGenreSummaries,
  sameBookSummaries,
}: Props) {
  const book = summary?.data?.book as IBook
  const { asPath } = useRouter()
  const { token, id } = getIdAndToken()

  const [allReviews, setallReviews] = useState<IReview[]>(
    // @ts-ignore
    summary?.data?.reviews,
  )

  const summaryId = summary?.data?._id
  const sameUserSummariesRest = sameUserSummaries.filter(
    sameSuummary => sameSuummary?._id !== summaryId,
  )
  const sameGenreSummariesRest = sameGenreSummaries.filter(
    sameSuummary => sameSuummary?._id !== summaryId,
  )
  const sameBookSummariesRest = sameBookSummaries.filter(
    sameSuummary => sameSuummary?._id !== summaryId,
  )

  return (
    <section className={styles.summaryContainer}>
      <div className="flex flex-col gap-8 max-w-4xl">
        <div>
          <Typography variant="h2">{book?.title}</Typography>
          <div className="flex pt-3">
            {book?.authors?.map((author, i) => (
              <p key={author?.id}>
                <span>{author?.fullName}</span>
                {book?.authors?.length - 1 !== i && <span>,&nbsp;</span>}
              </p>
            ))}
          </div>
          <Button variant="link" className="p-0 m-0 text-lg">
            <Link href={`summaries/genre/${book?.genre?._id}`}>
              {(book?.genre as unknown as IGenre)?.genre}
            </Link>
          </Button>
        </div>
        <div className="max-w-sm">
          {book?.image?.url ? (
            <Img src={book?.image} alt={book?.title} sizes="350px" />
          ) : null}
        </div>
        {book?.publicationYear ? (
          <div className="space-y-2">
            <Typography variant="h3">Publication Year</Typography>
            <p className="text-lg">{book?.publicationYear}</p>
          </div>
        ) : null}
        {book?.pageCount ? (
          <div className="space-y-2">
            <Typography variant="h3">Total Page</Typography>
            <p className="text-lg">{book?.pageCount}</p>
          </div>
        ) : null}
        {book?.description ? (
          <div className="space-y-2">
            <Typography variant="h3">Book Description</Typography>
            <p>{book?.description}</p>
          </div>
        ) : null}
        <div className="space-y-2">
          <Typography variant="h3">Summary</Typography>
          <ReactMarkdown className={styles.markdown}>
            {summary?.data?.content}
          </ReactMarkdown>
        </div>

        <Link href={`/dashboard/create/summary?bookId=${book?._id}`}>
          <Button
            variant="link"
            className="underline text-xl underline-offset-8"
          >
            Write summary on this book
          </Button>
        </Link>

        <div className="space-y-3">
          {id !== (summary?.data?.user as unknown as string) ? (
            <div>
              <Typography variant="h3">Post review</Typography>
              {token ? (
                <PostReviewForm
                  id={summary?.data?._id}
                  allReviews={allReviews}
                  setallReviews={setallReviews}
                />
              ) : (
                <div className="space-y-3">
                  <p className="text-secondary-foreground text-lg italic mb-3">
                    Login to post review
                  </p>
                  <Link href={`/login?redirected=true&prevPath=${asPath}`}>
                    <Button>Login</Button>
                  </Link>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="space-y-2">
          <Typography variant="h3">Reviews</Typography>
          {allReviews?.length ? (
            <div>
              {allReviews?.map(review => (
                <Review review={review} key={review._id as unknown as string} />
              ))}
            </div>
          ) : (
            <p className="italic text-secondary-foreground">No reviews yet</p>
          )}
        </div>
      </div>

      <aside className="w-80">
        <Typography variant="h4" className="py-5">
          Summaries with same book
        </Typography>
        <div>
          {sameBookSummariesRest?.length ? (
            <div className="flex flex-col gap-3">
              {sameBookSummariesRest?.map(sameBookSummary => (
                <SummaryMiniCard
                  summary={sameBookSummary}
                  key={sameBookSummary._id}
                />
              ))}
            </div>
          ) : (
            <p className="italic text-secondary-foreground">
              No books available
            </p>
          )}
        </div>

        <Typography variant="h4" className="pt-8 pb-5">
          Summaries with same writer
        </Typography>
        <div>
          {sameUserSummariesRest?.length ? (
            <div className="flex flex-col gap-3">
              {sameUserSummariesRest?.map(sameUserSummary => (
                <SummaryMiniCard
                  summary={sameUserSummary}
                  key={sameUserSummary._id}
                />
              ))}
            </div>
          ) : (
            <p className="italic text-secondary-foreground">
              No books available
            </p>
          )}
        </div>

        <Typography variant="h4" className="pt-8 pb-5">
          Summaries with same genre
        </Typography>
        <div>
          {sameGenreSummariesRest?.length ? (
            <div className="flex flex-col gap-3">
              {sameGenreSummariesRest?.map(sameGenreSummary => (
                <SummaryMiniCard
                  summary={sameGenreSummary}
                  key={sameGenreSummary._id}
                />
              ))}
            </div>
          ) : (
            <p className="italic text-secondary-foreground">
              No books available
            </p>
          )}
        </div>
      </aside>
    </section>
  )
}

SummaryDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout title="Summary | Reader's café">{page}</RootLayout>
}

export async function getServerSideProps({ params }) {
  const summary = await fetcher(`summaries/${params.id}`)
  const sameUserSummaries = await fetcher(
    `summaries/filtered?user=${summary?.data?.user?._id}&limit=4`,
  )
  const sameGenreSummaries = await fetcher(
    `summaries/filtered?genre=${summary?.data?.book?.genre?._id}&limit=4`,
  )
  const sameBookSummaries = await fetcher(
    `summaries/filtered?book=${summary?.data?.book?._id}&limit=3`,
  )

  return {
    props: {
      summary,
      sameUserSummaries: sameUserSummaries?.data || [],
      sameGenreSummaries: sameGenreSummaries?.data || [],
      sameBookSummaries: sameBookSummaries?.data || [],
    },
  }
}
