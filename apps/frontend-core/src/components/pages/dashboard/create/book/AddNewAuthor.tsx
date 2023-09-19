import animationData from '@/assets/lottie/savingFile.json'
import ButtonExtended from '@/components/ui/ButtonExtended'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Overlay from '@/components/ui/overlay'
import { useCreateAuthorMutation } from '@/redux/features/author/authorApi'
import { IError } from '@/types/IError'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { DialogClose } from '@radix-ui/react-dialog'
import { FilePlus2, PlusCircle } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IAuthor, IBook } from 'validation/types'

interface Props {
  selectedAuthors: IAuthor[]
  searchValue: string
  book: IBook
  setselectedAuthors: Dispatch<SetStateAction<IAuthor[]>>
  setsearchValue: Dispatch<SetStateAction<string>>
  setbook: Dispatch<SetStateAction<IBook>>
}
export default function AddNewAuthor({
  selectedAuthors,
  setselectedAuthors,
  searchValue,
  setsearchValue,
  book,
  setbook,
}: Props) {
  const { token } = getIdAndToken()
  const [newAuthor, setnewAuthor] = useState(searchValue)

  const [createAuthor, { isError, isLoading, isSuccess, error, data }] =
    useCreateAuthorMutation()

  const handleNewAuthor = () => {
    createAuthor({ payload: { fullName: newAuthor }, token })
  }

  useEffect(() => {
    if (isLoading) toast.success('Creating New Author!')
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) {
      toast.success('Created New Author Successfully!')
      setselectedAuthors([...selectedAuthors, data?.data])
      setsearchValue('')
      setbook({
        ...book,
        authors: [...book.authors, data?.data?._id],
      })
    }
  }, [isError, error, isSuccess, isLoading])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <ButtonExtended icon={<PlusCircle />} type="button">
            Add new author
          </ButtonExtended>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add Author</DialogTitle>
            <DialogDescription>
              Add new author to the list to use that in books
            </DialogDescription>
          </DialogHeader>
          <Input
            id="name"
            value={newAuthor}
            className="w-full"
            placeholder="Author's full name"
            onChange={e => setnewAuthor(e.target.value)}
          />
          <DialogFooter>
            <DialogClose>
              <ButtonExtended
                icon={<FilePlus2 />}
                onClick={handleNewAuthor}
                type="submit"
              >
                Create Author
              </ButtonExtended>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Overlay isOpen={isLoading} animationData={animationData} />
    </>
  )
}
