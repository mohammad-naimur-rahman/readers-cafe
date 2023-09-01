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
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateProfileMutation } from '@/redux/features/user/userApi'
import { IError } from '@/types/IError'
import { DialogClose } from '@radix-ui/react-dialog'
import { FileEdit } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface Props {
  bio: string
  id: string
  token: string
  isDataLoading: boolean
}

export default function Bio({ bio, id, token, isDataLoading }: Props) {
  const [updatedBio, setupdatedBio] = useState(bio)

  const handleBioChange = e => {
    if (e.target.value.length > 200) {
      toast.error('Bio must be within 200 characters!')
      return
    }
    setupdatedBio(e.target.value)
  }
  const [updateBook, { isLoading, isSuccess, isError, error }] =
    useUpdateProfileMutation()

  const handleUpdateBio = () => {
    updateBook({ payload: { bio: updatedBio }, id, token })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Bio updated successfully!')
    }
    if (isError) {
      toast.error((error as IError)?.data?.message)
    }
  }, [isSuccess, isError, error])
  return (
    <>
      {isDataLoading ? (
        <Skeleton className="mb-5 w-full sm:w-[450px]  h-28" />
      ) : (
        <p className="italic text-primary pb-5 max-w-md">{bio}</p>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <ButtonExtended icon={<FileEdit />} isLoading={isLoading}>
            Update bio
          </ButtonExtended>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Bio</DialogTitle>
            <DialogDescription>
              Write your bio within 200 characters
            </DialogDescription>
          </DialogHeader>
          <Textarea
            id="name"
            value={updatedBio}
            className="w-full"
            placeholder="Write your bio"
            onChange={handleBioChange}
          />
          <span className="text-right">{updatedBio?.length || 0}/200</span>
          <DialogFooter>
            <DialogClose>
              <ButtonExtended
                icon={<FileEdit />}
                onClick={handleUpdateBio}
                type="submit"
              >
                Update bio
              </ButtonExtended>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
