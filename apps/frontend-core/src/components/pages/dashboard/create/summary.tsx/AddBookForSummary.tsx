import ButtonExtended from '@/components/ui/ButtonExtended'
import { Input } from '@/components/ui/input'
import { API_URL } from '@/configs'
import axios from 'axios'
import clsx from 'clsx'
import { PlusCircle, Search } from 'lucide-react'
import Link from 'next/link'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { IBook, ISummary } from 'validation/types'
import SearchBookCard from './SearchBookCard'
import SelectedBookCard from './SelectedBookCard'

interface Props {
  summaryContents: ISummary
  setsummaryContents: Dispatch<SetStateAction<ISummary>>
  book: IBook
}

export default function AddBookForSummary({
  summaryContents,
  setsummaryContents,
  book: gottenBook,
}: Props) {
  const [searchValue, setsearchValue] = useState('')
  const [debouncedValue] = useDebounce(searchValue, 500)
  const [searchedBooks, setsearchedBooks] = useState<IBook[]>([])
  const [searching, setsearching] = useState(false)
  const [selectedBook, setselectedBook] = useState<IBook>(null)
  const [typing, settyping] = useState(false)
  const [stateToChange, setStateToChange] = useState(null)

  const handleInput = e => {
    setsearchValue(e.target.value)
    settyping(true)
    if (stateToChange) {
      clearTimeout(stateToChange)
    }
    setStateToChange(
      setTimeout(() => {
        settyping(false)
      }, 500),
    )
  }

  useEffect(() => {
    if (gottenBook) {
      setselectedBook(gottenBook)
    }
  }, [gottenBook])

  useEffect(() => {
    ;(async () => {
      if (debouncedValue) {
        setsearching(true)
        const result = await axios.get(
          `${API_URL}/books?search=${debouncedValue}`,
        )
        setsearching(false)
        setsearchedBooks(result?.data?.data)
      } else {
        setsearching(false)
        setsearchedBooks([])
      }
    })()
  }, [debouncedValue])
  return (
    <>
      {selectedBook ? (
        <SelectedBookCard book={selectedBook} />
      ) : (
        <Input
          type="text"
          value={searchValue}
          placeholder="🔍  Search by book title..."
          onChange={handleInput}
        />
      )}

      <div
        className={clsx(
          'max-h-72 overflow-y-auto rounded-md border !absolute left-0 top-full w-full bg-background z-10',
          {
            hidden: !searchValue,
          },
        )}
      >
        {(searching && searchValue) || (typing && searchValue) ? (
          <div className="flex items-center justify-center p-5 w-full">
            <p className="text-lg italic flex items-center gap-2">
              <Search />
              Searching...
            </p>
          </div>
        ) : (
          <div
            className={clsx({
              hidden: selectedBook,
            })}
          >
            {searchedBooks?.length ? (
              <div className="flex flex-col gap-2 p-2">
                {searchedBooks?.map(book => (
                  <SearchBookCard
                    key={book._id}
                    book={book}
                    onClick={() => {
                      setselectedBook(book)
                      setsearchValue('')
                      setsummaryContents({
                        ...summaryContents,
                        book: book._id as any,
                      })
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full p-10 flex flex-col gap-4 items-center justify-center">
                <p className="italic">No books found!</p>
                <Link
                  href={`/dashboard/create/book?redirectedFrom=summary&bookTitle=${debouncedValue}`}
                >
                  <ButtonExtended icon={<PlusCircle />} type="button">
                    Create new book
                  </ButtonExtended>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
