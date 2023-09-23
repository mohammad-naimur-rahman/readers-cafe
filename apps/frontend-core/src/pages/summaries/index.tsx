import RootLayout from '@/components/layouts/RootLayout'
import SummaryCard from '@/components/ui/core/cards/SummaryCard'
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

  const goToNextPage = async () => {
    setcurrentPage(currentPage + 1)
    const nextPage = await fetcher(
      'summaries',
      `page=${currentPage + 1}&limit=2&published=true`,
    )
    setdata([...data, ...nextPage.data])
    sethasMore(nextPage?.meta?.page < nextPage?.meta?.totalPages)
  }
  return (
    <section className="container">
      <Typography variant="h1" className="px-5 py-10">
        All Summaries
      </Typography>
      <InfiniteScroll
        dataLength={summaries.data.length}
        next={goToNextPage}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <div className="flex flex-col">
          {data.map(summary => (
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
  const summaries = await fetcher('summaries', 'page=1&limit=2&published=true')
  return {
    props: {
      summaries,
    },
    revalidate: 60,
  }
}
