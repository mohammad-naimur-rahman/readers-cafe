import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { API_URL } from '@/configs'
import axios from 'axios'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { IBook } from 'validation/types'
import SearchBookCard from './SearchBookCard'

export default function AddBookForSummary() {
  const [searchValue, setsearchValue] = useState('')
  const [debouncedValue] = useDebounce(searchValue, 1000)

  const [searchedBooks, setsearchedBooks] = useState<IBook[]>([])

  useEffect(() => {
    ;(async () => {
      if (debouncedValue) {
        const result = await axios.get(
          `${API_URL}/books?search=${debouncedValue}`,
        )
        setsearchedBooks(result?.data?.data)
      } else {
        setsearchedBooks([])
      }
    })()
  }, [debouncedValue])
  return (
    <>
      <Input
        type="text"
        value={searchValue}
        placeholder="Search by book title..."
        onChange={e => setsearchValue(e.target.value)}
      />
      <ScrollArea
        className={clsx(
          'max-h-72 rounded-md border !absolute left-0 top-full w-full bg-background z-10',
          {
            hidden: !searchValue,
          },
        )}
      >
        <div className="flex flex-col gap-2">
          {searchedBooks?.map(book => (
            <SearchBookCard book={book} />
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
