import RootLayout from '@/components/layouts/RootLayout'
import { Button } from '@/components/ui/button'
import Img from '@/components/ui/img'
import Typography from '@/components/ui/typrgraphy'
import styles from '@/styles/markdown.module.scss'
import { fetcher } from '@/utils/fetcher'
import Link from 'next/link'
import { ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import { IBook, IGenre, ISummary } from 'validation/types'

interface Props {
  summary: {
    data: ISummary
  }
}

export default function SummaryDetailsPage({ summary }: Props) {
  const book = summary?.data?.book as IBook
  return (
    <section className="flex flex-col gap-8 max-w-4xl mx-auto px-2">
      <div>
        <Typography variant="h2">{book?.title}</Typography>
        <div className="flex pt-3">
          {book?.authors?.map((author, i) => (
            <p key={author?.id}>
              <span>{author?.fullName}</span>
              {book.authors.length - 1 !== i && <span>,&nbsp;</span>}
            </p>
          ))}
        </div>
        <Button variant="link" className="p-0 m-0 text-lg">
          <Link href={`summaries/genre/${book?.genre?._id}`}>
            {(book?.genre as unknown as IGenre).genre}
          </Link>
        </Button>
      </div>
      <div className="mx-auto max-w-sm">
        {book?.image?.url ? <Img src={book?.image} alt={book?.title} /> : null}
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

      <div className="space-y-2">
        <Typography variant="h3">Reviews</Typography>
        {summary?.data?.reviews?.length ? (
          <div>
            <p>Hello</p>
          </div>
        ) : (
          <p className="italic text-secondary-foreground">No reviews yet</p>
        )}
      </div>
    </section>
  )
}

SummaryDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout title="Summary | Reader's café">{page}</RootLayout>
}

export async function getServerSideProps({ params }) {
  const summary = await fetcher(`summaries/${params.id}`)
  return {
    props: {
      summary,
    },
  }
}
