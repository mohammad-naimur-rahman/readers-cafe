import DashboardLayout from '@/components/layouts/DashboardLayout'
import PaginationFields from '@/components/pages/dashboard/contents/book/PaginationFields'
import ShortContentCard from '@/components/pages/dashboard/contents/shortContent/ShortContentCard'
import ButtonExtended from '@/components/ui/ButtonExtended'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import NoContent from '@/components/ui/dashboard/common/NoContent'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetMyShortContentsQuery } from '@/redux/features/shortContent/shortContentApi'
import { IError } from '@/types/IError'
import { IShortContentQueries } from '@/types/queries/IBookQueries'
import { withAuth } from '@/utils/auth/withAuth'
import { qs } from '@/utils/formUtils/qs'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { Eraser, Search } from 'lucide-react'
import { ReactElement, useState } from 'react'

export default function ShortContentPage() {
  const sortByValues = [
    { value: 'caption', label: 'Caption' },
    { value: 'createdAt', label: 'Date' },
  ]

  const sortOrderValues = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]

  const initSummaryQueries: IShortContentQueries = {
    search: '',
    caption: '',
    sortBy: 'createdAt',
    sortOrder: 'asc' as 'asc',
    page: 1,
    limit: 10,
  }

  const { token } = getIdAndToken()
  const [query, setquery] = useState(initSummaryQueries)
  const [queryString, setqueryString] = useState(qs(initSummaryQueries))
  const { isFetching, isError, error, data } = useGetMyShortContentsQuery({
    token,
    query: queryString,
  })

  const next = () => {
    setquery({ ...query, page: query.page + 1 })
    const queryStr = qs({ ...query, page: query.page + 1 })
    setqueryString(queryStr)
  }

  const previous = () => {
    setquery({ ...query, page: query.page - 1 })
    const queryStr = qs({ ...query, page: query.page - 1 })
    setqueryString(queryStr)
  }

  const clearFields = () => {
    setquery(initSummaryQueries)
    setqueryString('')
  }

  const handleQuery = e => {
    e.preventDefault()
    setqueryString('')
    const queryStr = qs(query)
    console.log(queryStr)
    setqueryString(queryStr)
  }

  if (isError) {
    return (
      <DashbaordErrorComponent
        errorMessage={(error as IError)?.data?.message}
      />
    )
  }

  return (
    <section>
      <h2 className="text-3xl pt-3 px-2 text-center">All Short Contents</h2>

      <form
        onSubmit={handleQuery}
        className="flex gap-2 px-2 mt-5 justify-center"
      >
        <Input
          placeholder="Search with Caption"
          className="max-w-md"
          value={query.search}
          onChange={e => setquery({ ...query, search: e.target.value })}
        />

        <Select
          value={query.sortBy}
          onValueChange={value =>
            setquery({
              ...query,
              sortBy: value as unknown as IShortContentQueries['sortBy'],
            })
          }
        >
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="overflow-auto max-h-[50dvh]">
              <SelectLabel>Sort By</SelectLabel>
              {sortByValues?.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={query.sortOrder}
          onValueChange={value =>
            setquery({
              ...query,
              sortOrder: value as unknown as IShortContentQueries['sortOrder'],
            })
          }
        >
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="overflow-auto max-h-[50dvh]">
              <SelectLabel>Sort Order</SelectLabel>
              {sortOrderValues?.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <ButtonExtended icon={<Search />}>Search</ButtonExtended>
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
            <Skeleton className="h-[500px]" key={el} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 pt-5">
          {data?.data?.map(shortContent => (
            <ShortContentCard
              key={shortContent._id}
              shortContent={shortContent}
            />
          ))}
        </div>
      )}

      <PaginationFields
        data={data?.meta}
        next={next}
        previous={previous}
        show={data?.data?.length}
      />

      <NoContent
        isLoading={isFetching}
        data={data}
        content="Short Content"
        createNewLink="/dashboard/create/short-content"
      />
    </section>
  )
}

ShortContentPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="All Blogs | Reader's café">{page}</DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
