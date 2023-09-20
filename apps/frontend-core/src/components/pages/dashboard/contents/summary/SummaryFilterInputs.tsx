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
import { ISummaryQueries } from '@/types/queries/IFilterQueries'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  query: ISummaryQueries
  setquery: Dispatch<SetStateAction<ISummaryQueries>>
}

export default function SummaryFilterInputs({ query, setquery }: Props) {
  const sortByValues = [
    { value: 'title', label: 'Title' },
    { value: 'createdAt', label: 'Date' },
  ]

  const sortOrderValues = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]

  const publishedValues = [
    { value: '', label: 'All' },
    { value: 'true', label: 'Published' },
    { value: 'false', label: 'Unpublished' },
  ]

  return (
    <>
      <Input
        type="text"
        placeholder="Search by Book Title"
        name="search"
        value={query.search}
        onChange={e => setquery({ ...query, search: e.target.value })}
      />

      <Select
        value={query.published as unknown as string}
        onValueChange={value =>
          setquery({
            ...query,
            published: value as unknown as boolean,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Published" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="overflow-auto max-h-[50dvh]">
            <SelectLabel>Published</SelectLabel>
            {publishedValues?.map(({ value, label }) => (
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
