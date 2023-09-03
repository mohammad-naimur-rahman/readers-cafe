import ButtonExtended from '@/components/ui/ButtonExtended'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { FileSignature, Pen, X } from 'lucide-react'
import { useState } from 'react'

interface Props {
  fullName: string
  id: string
  token: string
  isLoading: boolean
  updateBook: (payload) => void
}

export default function FullName({
  id,
  token,
  isLoading,
  fullName,
  updateBook,
}: Props) {
  const [updatedName, setupdatedName] = useState(fullName)
  const [editMode, seteditMode] = useState(false)

  const handleUpdateName = () => {
    seteditMode(false)
    updateBook({ payload: { fullName: updatedName }, id, token })
  }

  return (
    <div>
      {isLoading ? (
        <Skeleton className="my-2 w-64 h-10" />
      ) : (
        <div className="flex items-center">
          {editMode ? (
            <div className="flex items-center gap-3 py-5">
              <Input
                placeholder="Edit your Name"
                value={updatedName}
                onChange={e => setupdatedName(e.target.value)}
              />
              <ButtonExtended
                icon={<FileSignature />}
                onClick={handleUpdateName}
              >
                Update
              </ButtonExtended>
              <X
                className="w-10 h-10 cursor-pointer"
                onClick={() => seteditMode(false)}
              />
            </div>
          ) : (
            <div className="flex items-center">
              <h2 className="py-2 text-4xl">{fullName}</h2>
              <Pen
                className="w-5 h-5 mt-3 ml-3.5 text-primary cursor-pointer"
                onClick={() => seteditMode(prev => !prev)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
