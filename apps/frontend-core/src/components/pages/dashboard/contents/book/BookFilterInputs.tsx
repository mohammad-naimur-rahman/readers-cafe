import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetGenresQuery } from '@/redux/features/genre/genreApi'
import { IBookQueries } from '@/types/queries/IBookQueries'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  query: IBookQueries
  setquery: Dispatch<SetStateAction<IBookQueries>>
}

export default function BookFilterInputs({ query, setquery }: Props) {
  const sortByValues = ['title', 'publicationYear', 'author', 'genre']
  const sortOrderValues = ['asc', 'desc']
  const { data } = useGetGenresQuery(undefined)
  const allGenres = data?.data

  const setQuery = () => e => {
    setquery({ ...query, [e.target.name]: e.target.value })
  }

  return (
    <section className="flex">
      <Input
        type="text"
        placeholder="Search by title, author, publication year and genre"
        name="search"
        onChange={setQuery()}
      />

      <Select
        onValueChange={value =>
          setquery({
            ...query,
            genre: value as unknown as IBookQueries['genre'],
          })
        }
      >
        <SelectTrigger className="max-w-xs">
          <SelectValue placeholder="Select Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="overflow-auto max-h-[50dvh]">
            {allGenres?.map(genre => (
              <SelectItem key={genre._id} value={genre._id}>
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
        onChange={setQuery()}
      />

      <Input
        type="text"
        placeholder="Author Name"
        name="author"
        onChange={setQuery()}
      />

      <Select
        onValueChange={value =>
          setquery({
            ...query,
            sortBy: value as unknown as IBookQueries['sortBy'],
          })
        }
      >
        <SelectTrigger className="max-w-xs">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="overflow-auto max-h-[50dvh]">
            {sortByValues?.map(sortBy => (
              <SelectItem key={sortBy} value={sortBy}>
                {sortBy}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={value =>
          setquery({
            ...query,
            sortOrder: value as unknown as IBookQueries['sortOrder'],
          })
        }
      >
        <SelectTrigger className="max-w-xs">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="overflow-auto max-h-[50dvh]">
            {sortOrderValues?.map(sortOrder => (
              <SelectItem key={sortOrder} value={sortOrder}>
                {sortOrder}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  )
}
