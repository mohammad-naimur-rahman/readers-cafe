import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { API_URL } from '@/configs'
import axios from 'axios'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { IAuthor, IBook } from 'validation/types'
import AddNewAuthor from './AddNewAuthor'
import SelectedAuthors from './SelectedAuthors'

interface Props {
  book: IBook
  setbook: Dispatch<SetStateAction<IBook>>
}

export default function ManageAuthors({ book, setbook }: Props) {
  const [searchValue, setsearchValue] = useState('')
  const [debouncedValue] = useDebounce(searchValue, 500)
  const [searchedAuthors, setsearchedAuthors] = useState<IAuthor[]>([])
  const [searching, setsearching] = useState(false)
  const [selectedAuthors, setselectedAuthors] = useState<IAuthor[]>([])

  useEffect(() => {
    ;(async () => {
      if (debouncedValue) {
        setsearching(true)
        const result = await axios.get(
          `${API_URL}/authors?search=${debouncedValue}`,
        )
        setsearching(false)
        setsearchedAuthors(result?.data?.data)
      } else {
        setsearching(false)
        setsearchedAuthors([])
      }
    })()
  }, [debouncedValue])

  return (
    <>
      <Input
        type="text"
        value={searchValue}
        placeholder="Search by author's name..."
        onChange={e => setsearchValue(e.target.value)}
      />

      <SelectedAuthors authors={selectedAuthors} />

      <ScrollArea
        className={clsx(
          'max-h-72 rounded-md border !absolute left-0 top-full w-full bg-background z-10',
          {
            hidden: !searchValue,
          },
        )}
      >
        {searching ? (
          <div className="flex items-center justify-center p-5 w-full">
            <p className="text-lg italic">Searching...</p>
          </div>
        ) : (
          <div>
            {searchedAuthors?.length > 0 ? (
              <div className="flex flex-col gap-2">
                {searchedAuthors?.map(author => (
                  <Button
                    type="button"
                    variant="ghost"
                    key={author._id}
                    onClick={() => {
                      setselectedAuthors([...selectedAuthors, author])
                      setsearchValue('')
                      setbook({
                        ...book,
                        authors: [...book.authors, author._id as any],
                      })
                    }}
                  >
                    {author.fullName}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="w-full p-10 flex flex-col gap-4 items-center justify-center">
                <p className="italic">No author found!</p>

                <AddNewAuthor
                  selectedAuthors={selectedAuthors}
                  setselectedAuthors={setselectedAuthors}
                  searchValue={searchValue}
                  setsearchValue={setsearchValue}
                  book={book}
                  setbook={setbook}
                />
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </>
  )
}
