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
import { initSummaryQueries } from '@/constants/dashboard/queryValues'
import { IShortContentQueries } from '@/types/queries/IBookQueries'
import { qs } from '@/utils/formUtils/qs'
import { Eraser, Search } from 'lucide-react'

export default function ShortContentFilterFields({
  query,
  setquery,
  setqueryString,
}) {
  const sortByValues = [
    { value: 'caption', label: 'Caption' },
    { value: 'createdAt', label: 'Date' },
  ]

  const sortOrderValues = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]

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
  return (
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
  )
}
