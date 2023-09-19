import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchResult } from '@/hooks/useSearchResult'
import clsx from 'clsx'
import { Search } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { IAuthor, IBook } from 'validation/types'
import AddNewAuthor from '../../create/book/AddNewAuthor'
import SelectedAuthors from './SelectedUpdatedAuthors'

interface Props {
  book: IBook
  setbook: Dispatch<SetStateAction<IBook>>
  selectedAuthors: IAuthor[]
  setselectedAuthors: Dispatch<SetStateAction<IAuthor[]>>
}

export default function ManageUpdatedAuthors({
  book,
  setbook,
  selectedAuthors,
  setselectedAuthors,
}: Props) {
  // const [selectedAuthors, setselectedAuthors] = useState<IAuthor[]>(
  //   book.authors as IAuthor[],
  // )

  // useEffect(() => {
  //   if (book?.authors?.length > 0) {
  //     setselectedAuthors(book?.authors as IAuthor[])
  //   }
  // }, [book?.authors])

  const {
    isSearching,
    handleInput,
    searchedData,
    searchValue,
    setsearchValue,
  } = useSearchResult<IAuthor>('authors')

  return (
    <>
      <Input
        type="text"
        value={searchValue}
        placeholder="🔍  Search by author's name..."
        onChange={handleInput}
      />

      <SelectedAuthors
        authors={selectedAuthors}
        setauthors={setselectedAuthors}
      />

      <div
        className={clsx(
          'max-h-72 rounded-md border overflow-y-auto !absolute left-0 top-full w-full bg-background z-10',
          {
            hidden: !searchValue,
          },
        )}
      >
        {isSearching ? (
          <div className="flex items-center justify-center p-5 w-full">
            <p className="text-lg italic flex grid-cols-1 gap-2">
              <Search />
              Searching...
            </p>
          </div>
        ) : (
          <div>
            {searchedData?.length > 0 ? (
              <div className="flex flex-col gap-2">
                {searchedData?.map(author => (
                  <Button
                    type="button"
                    variant="ghost"
                    key={author._id}
                    onClick={() => {
                      setselectedAuthors([...selectedAuthors, author])
                      setsearchValue('')
                      // setbook({
                      //   ...book,
                      //   authors: [...book.authors, author._id as any],
                      // })
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
      </div>
    </>
  )
}
