/* eslint-disable no-unsafe-optional-chaining */
import RootLayout from '@/components/layouts/RootLayout'
import SummaryFilterInputs from '@/components/pages/dashboard/contents/summary/SummaryFilterInputs'
import ButtonExtended from '@/components/ui/ButtonExtended'
import SummaryCard from '@/components/ui/core/cards/SummaryCard'
import Loading from '@/components/ui/core/infiniteScroll/Loading'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typrgraphy'
import { initSummaryQueries } from '@/constants/dashboard/queryValues'
import { useApiData } from '@/hooks/useApiData'
import { IResponse } from '@/types/IResponse'
import { ISummaryQueries } from '@/types/queries/IFilterQueries'
import { fetcher } from '@/utils/fetcher'
import { qs } from '@/utils/formUtils/qs'
import { Eraser, Search } from 'lucide-react'
import { ReactElement, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ISummary } from 'validation/types'

interface Props {
  summaries: IResponse<ISummary>
}

export default function AllSumarriesPage({ summaries }: Props) {
  const [currentPage, setcurrentPage] = useState(summaries?.meta?.page)
  const [data, setdata] = useState(summaries?.data)
  const [hasMore, sethasMore] = useState(true)

  const [query, setquery] = useState<ISummaryQueries>({
    ...initSummaryQueries,
    published: true,
  })

  const [queryString, setqueryString] = useState(
    qs({ ...initSummaryQueries, published: true }),
  )

  const { data: summariesData, isFetching } = useApiData(
    'summaries',
    queryString,
  )

  console.log(isFetching)

  useEffect(() => {
    if (summariesData) {
      setdata(summariesData?.data)
      // sethasMore(isLastPage(summariesData?.meta))
    }
  }, [summariesData, queryString])

  const next = async () => {
    setcurrentPage(currentPage + 1)
    const nextPage = await fetcher(
      'summaries',
      qs({ ...query, page: currentPage + 1, published: true }),
      // `page=${currentPage + 1}&published=true`,
    )

    if (nextPage?.data) setdata([...data, ...nextPage.data])
    sethasMore(nextPage?.meta?.page < nextPage?.meta?.totalPages)
  }

  const filterBooks = e => {
    e.preventDefault()
    setqueryString(
      qs({
        ...initSummaryQueries,
        published: true,
      }),
    )
    const queryStr = qs(query)
    setqueryString(queryStr)
  }

  const clearFields = () => {
    setquery(initSummaryQueries)
    setcurrentPage(1)
    sethasMore(true)
    setqueryString(
      qs({
        ...initSummaryQueries,
        published: true,
      }),
    )
  }

  return (
    <section className="container">
      <Typography variant="h1" className="px-5 py-10">
        All Summaries
      </Typography>
      <div className="flex flex-col">
        <form onSubmit={filterBooks} className="flex gap-2">
          <SummaryFilterInputs
            query={query}
            setquery={setquery}
            showPublished={false}
          />
          <ButtonExtended icon={<Search />}>Search Books</ButtonExtended>
          <ButtonExtended
            type="button"
            variant="destructive"
            icon={<Eraser />}
            onClick={clearFields}
          >
            Clear Filter
          </ButtonExtended>
        </form>

        {isFetching ? (
          <div className="grid grid-cols-4 gap-5 pt-5">
            {[0, 1, 2, 3, 4, 5, 6, 7].map(el => (
              <Skeleton className="h-[580px]" key={el} />
            ))}
          </div>
        ) : (
          <InfiniteScroll
            dataLength={data?.length || 0}
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
        )}
      </div>
    </section>
  )
}

AllSumarriesPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout title="All Summaries | Reader's café">{page}</RootLayout>
}

export async function getStaticProps() {
  const summaries = await fetcher(
    'summaries',
    qs({ ...initSummaryQueries, published: true }),
  )
  return {
    props: {
      summaries,
    },
    revalidate: 60,
  }
}
