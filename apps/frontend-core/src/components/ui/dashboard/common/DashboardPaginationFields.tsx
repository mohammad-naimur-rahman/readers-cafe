import { qs } from '@/utils/formUtils/qs'
import PaginationFields from './PaginationFields'

export default function DashboardPaginationFields({
  query,
  setquery,
  data,
  setqueryString,
}) {
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

  return (
    <PaginationFields
      data={data?.meta}
      next={next}
      previous={previous}
      show={data?.data?.length}
    />
  )
}
