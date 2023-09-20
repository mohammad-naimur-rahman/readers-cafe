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
import { useGetGenresQuery } from '@/redux/features/genre/genreApi'
import { IBookQueries } from '@/types/queries/IFilterQueries'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  query: IBookQueries
  setquery: Dispatch<SetStateAction<IBookQueries>>
}

export default function BookFilterInputs({ query, setquery }: Props) {
  const sortByValues = [
    { value: 'title', label: 'Title' },
    { value: 'publicationYear', label: 'Publication Year' },
    { value: 'author', label: 'Author' },
    { value: 'genre', label: 'Genre' },
  ]

  const sortOrderValues = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]

  const { data } = useGetGenresQuery(undefined)
  const allGenres = data?.data

  const setQuery = () => e => {
    setquery({ ...query, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Select
        value={query.genre}
        onValueChange={value =>
          setquery({
            ...query,
            genre: value as unknown as IBookQueries['genre'],
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="overflow-auto max-h-[50dvh]">
            <SelectLabel>Select Genre</SelectLabel>
            {allGenres?.map(genre => (
              <SelectItem key={genre._id} value={genre.genre}>
                {genre.genre}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Publication Year"
        name="publicationYear"
        value={query.publicationYear}
        onChange={setQuery()}
      />

      <Input
        type="text"
        placeholder="Author Name"
        name="author"
        value={query.author}
        onChange={setQuery()}
      />

      <Select
        value={query.sortBy}
        onValueChange={value =>
          setquery({
            ...query,
            sortBy: value as unknown as IBookQueries['sortBy'],
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
            sortOrder: value as unknown as IBookQueries['sortOrder'],
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
