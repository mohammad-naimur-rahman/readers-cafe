import noImage from '@/assets/images/no-image.png'
import animationData from '@/assets/lottie/deleting.json'
import ButtonExtended from '@/components/ui/ButtonExtended'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import Img, { LocalImg } from '@/components/ui/img'
import Overlay from '@/components/ui/overlay'
import { useDeleteShortContentMutation } from '@/redux/features/shortContent/shortContentApi'
import { IError } from '@/types/IError'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { FileEdit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IShortContent } from 'validation/types'

interface Props {
  shortContent: IShortContent
}

export default function ShortContentCard({ shortContent }: Props) {
  const { token } = getIdAndToken()
  const [showDeletePrompt, setshowDeletePrompt] = useState(false)

  const [
    deleteShortContent,
    {
      isLoading: isDeleting,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteShortContentMutation()

  const handleDeleteShortContent = () => {
    deleteShortContent({
      id: shortContent._id,
      token,
    })
  }

  useEffect(() => {
    if (isDeleting) toast.success('Deleting ShortContent!')
    if (isDeleteError) toast.error((deleteError as IError)?.data?.message)
    if (isDeleteSuccess) toast.success('ShortContent Deleted Successfully!')
  }, [deleteError, isDeleteError, isDeleteSuccess, isDeleting])
  return (
    <>
      <Card>
        <CardHeader className="p-3">
          <CardTitle className="text-lg">{shortContent.caption}</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="h-[350px]">
            {shortContent?.image?.url ? (
              <Img
                src={shortContent?.image}
                alt={shortContent?.caption}
                className="h-full w-auto mx-auto object-contain"
              />
            ) : (
              <LocalImg
                src={noImage}
                alt={shortContent?.caption}
                className="h-full w-auto mx-auto object-contain"
              />
            )}
          </div>
          <p className="pt-3">
            <span className="font-semibold">Total comment: </span>
            {shortContent.comments.length}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-2 pb-2 pt-5 px-2">
          <Link href={`/dashboard/update/short-content/${shortContent._id}`}>
            <ButtonExtended icon={<FileEdit />} type="submit">
              Edit Content
            </ButtonExtended>
          </Link>
          <ButtonExtended
            icon={<Trash2 />}
            variant="destructive"
            size="sm"
            onClick={() => setshowDeletePrompt(true)}
          >
            Delete Content
          </ButtonExtended>
        </CardFooter>
      </Card>

      <ConfirmationPrompt
        open={showDeletePrompt}
        onOpenChange={setshowDeletePrompt}
        cb={handleDeleteShortContent}
      />

      <Overlay isOpen={isDeleting} animationData={animationData} />
    </>
  )
}
