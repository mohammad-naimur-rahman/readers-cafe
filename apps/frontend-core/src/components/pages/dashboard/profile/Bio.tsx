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
import { DialogClose } from '@radix-ui/react-dialog'
import { FileEdit } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface Props {
  bio: string
  id: string
  token: string
  isLoading: boolean
  isUpdating: boolean
  updateBook: (payload) => void
}

export default function Bio({
  bio,
  id,
  token,
  isLoading,
  isUpdating,
  updateBook,
}: Props) {
  const [updatedBio, setupdatedBio] = useState(bio)

  const handleBioChange = e => {
    if (e.target.value.length > 200) {
      toast.error('Bio must be within 200 characters!')
      return
    }
    setupdatedBio(e.target.value)
  }

  const handleUpdateBio = () => {
    updateBook({ payload: { bio: updatedBio }, id, token })
  }

  return (
    <>
      {isLoading ? (
        <Skeleton className="mb-5 w-full sm:w-[450px]  h-28" />
      ) : (
        <p className="italic text-primary pb-5 max-w-md">{bio}</p>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <ButtonExtended icon={<FileEdit />} isLoading={isUpdating}>
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
