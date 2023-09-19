import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ISummaryQueries } from '@/types/queries/IBookQueries'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  query: ISummaryQueries
  setquery: Dispatch<SetStateAction<ISummaryQueries>>
}

export default function SummaryFilterInputs({ query, setquery }: Props) {
  const sortByValues = [{ value: 'title', label: 'Title' }]

  const sortOrderValues = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]
  return (
    <>
      <Select
        value={query.sortBy}
        onValueChange={value =>
          setquery({
            ...query,
            sortBy: value as unknown as ISummaryQueries['sortBy'],
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="overflow-auto max-h-[50dvh]">
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
            sortOrder: value as unknown as ISummaryQueries['sortOrder'],
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="overflow-auto max-h-[50dvh]">
            {sortOrderValues?.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
