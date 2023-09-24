/* eslint-disable no-unsafe-optional-chaining */
import RootLayout from '@/components/layouts/RootLayout'
import SummaryCard from '@/components/ui/core/cards/SummaryCard'
import Loading from '@/components/ui/core/infiniteScroll/Loading'
import Typography from '@/components/ui/typrgraphy'
import { IResponse } from '@/types/IResponse'
import { fetcher } from '@/utils/fetcher'
import { ReactElement, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ISummary } from 'validation/types'

interface Props {
  summaries: IResponse<ISummary>
}

export default function AllSumarriesPage({ summaries }: Props) {
  const [currentPage, setcurrentPage] = useState(summaries?.meta?.page)
  const [data, setdata] = useState(summaries?.data)
  const [hasMore, sethasMore] = useState(true)

  const next = async () => {
    setcurrentPage(currentPage + 1)
    const nextPage = await fetcher(
      'summaries',
      `page=${currentPage + 1}&published=true`,
    )

    if (nextPage?.data) setdata([...data, ...nextPage.data])
    sethasMore(nextPage?.meta?.page < nextPage?.meta?.totalPages)
  }

  return (
    <section className="container">
      <Typography variant="h1" className="px-5 py-10">
        All Summaries
      </Typography>
      <InfiniteScroll
        dataLength={data?.length}
        next={next}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <div className="card-container">
          {data?.map(summary => (
            <SummaryCard
              key={summary._id}
              summary={summary}
              fixedSize={false}
            />
          ))}
        </div>
      </InfiniteScroll>
    </section>
  )
}

AllSumarriesPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout title="All Summaries | Reader's café">{page}</RootLayout>
}

export async function getStaticProps() {
  const summaries = await fetcher('summaries', 'page=1&published=true')
  return {
    props: {
      summaries,
    },
    revalidate: 60,
  }
}
