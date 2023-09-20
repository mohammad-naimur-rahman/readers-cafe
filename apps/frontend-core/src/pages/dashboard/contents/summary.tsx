import DashboardLayout from '@/components/layouts/DashboardLayout'
import SummaryCard from '@/components/pages/dashboard/contents/summary/SummaryCard'
import SummaryFilterInputs from '@/components/pages/dashboard/contents/summary/SummaryFilterInputs'
import ButtonExtended from '@/components/ui/ButtonExtended'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import DashboardPaginationFields from '@/components/ui/dashboard/common/DashboardPaginationFields'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetMySummariesQuery } from '@/redux/features/summary/summaryApi'
import { IError } from '@/types/IError'
import { ISummaryQueries } from '@/types/queries/IFilterQueries'
import { withAuth } from '@/utils/auth/withAuth'
import { qs } from '@/utils/formUtils/qs'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { Eraser, Filter, Search } from 'lucide-react'
import { ReactElement, useState } from 'react'

export default function AllSummariesPage() {
  const { token } = getIdAndToken()
  const initSummaryQueries: ISummaryQueries = {
    search: '',
    title: '',
    published: true,
    sortBy: 'title',
    sortOrder: 'asc' as 'asc',
    page: 1,
    limit: 10,
  }

  const [query, setquery] = useState<ISummaryQueries>(initSummaryQueries)
  const [queryString, setqueryString] = useState('')
  const { isFetching, isError, error, data } = useGetMySummariesQuery({
    token,
    query: queryString,
  })

  const searchBooks = e => {
    e.preventDefault()
    setqueryString('')
    const queryStr = qs({
      search: query.search,
      page: query.page,
      limit: query.limit,
    })
    setqueryString(queryStr)
  }

  const filterBooks = e => {
    e.preventDefault()
    setqueryString('')
    const { search, ...queryWithoutSearch } = query
    const queryStr = qs(queryWithoutSearch)
    setqueryString(queryStr)
  }

  const clearFields = () => {
    setquery(initSummaryQueries)
    setqueryString('')
  }

  if (isError) {
    return (
      <DashbaordErrorComponent
        errorMessage={(error as IError)?.data?.message}
      />
    )
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-3xl pt-3">All Summaries</h2>

      <form
        onSubmit={searchBooks}
        className="flex gap-2 my-3 max-w-4xl mx-auto w-full"
      >
        <Input
          type="text"
          placeholder="Search by title, author, publication year and genre"
          name="search"
          value={query.search}
          onChange={e => setquery({ ...query, search: e.target.value })}
        />
        <ButtonExtended icon={<Search />}>Search Books</ButtonExtended>
        <ButtonExtended
          type="button"
          variant="destructive"
          icon={<Eraser />}
          onClick={clearFields}
        >
          Clear Search
        </ButtonExtended>
      </form>

      <form
        onSubmit={filterBooks}
        className="flex w-full gap-2 mt-5 [&>*]:max-w-xs"
      >
        <SummaryFilterInputs query={query} setquery={setquery} />
        <ButtonExtended icon={<Filter />}>Filter Books</ButtonExtended>
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
        <div className="grid grid-cols-4 gap-5 pt-5">
          {data?.data?.map(summary => (
            <SummaryCard key={summary._id} summary={summary} />
          ))}
        </div>
      )}

      <DashboardPaginationFields
        query={query}
        setquery={setquery}
        data={data}
        setqueryString={setqueryString}
      />

      <NoContent
        isLoading={isFetching}
        data={data}
        content="Summary"
        createNewLink="/dashboard/create/summary"
      />
    </section>
  )
}

AllSummariesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="All Summaries | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
