import ButtonExtended from '@/components/ui/ButtonExtended'
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
import { initShortContentQueries } from '@/constants/dashboard/queryValues'
import {
  IDiscussionQueries,
  IShortContentQueries,
} from '@/types/queries/IFilterQueries'
import { qs } from '@/utils/formUtils/qs'
import { Eraser, Search } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  query: IDiscussionQueries
  setquery: Dispatch<SetStateAction<IDiscussionQueries>>
  setqueryString: Dispatch<SetStateAction<string>>
}

export default function DiscussionFilterFields({
  query,
  setquery,
  setqueryString,
}: Props) {
  const sortByValues = [
    { value: 'topic', label: 'Topic' },
    { value: 'createdAt', label: 'Date' },
  ]

  const sortOrderValues = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]

  const openValues = [
    { value: '', label: 'All' },
    { value: 'true', label: 'Opened' },
    { value: 'false', label: 'Closed' },
  ]

  const clearFields = () => {
    setquery(initShortContentQueries)
    setqueryString('')
  }

  const handleQuery = e => {
    e.preventDefault()
    setqueryString('')
    const queryStr = qs(query)
    setqueryString(queryStr)
  }
  return (
    <form
      onSubmit={handleQuery}
      className="flex gap-2 px-2 mt-5 justify-center"
    >
      <Input
        placeholder="Search with Topic"
        className="max-w-md"
        value={query.search}
        onChange={e => setquery({ ...query, search: e.target.value })}
      />

      <Select
        value={query.status}
        onValueChange={value =>
          setquery({
            ...query,
            status: value,
          })
        }
      >
        <SelectTrigger className="max-w-xs">
          <SelectValue placeholder="Open" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="overflow-auto max-h-[50dvh]">
            <SelectLabel>Open</SelectLabel>
            {openValues?.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={query.sortBy}
        onValueChange={value =>
          setquery({
            ...query,
            sortBy: value as unknown as IDiscussionQueries['sortBy'],
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
  )
}
