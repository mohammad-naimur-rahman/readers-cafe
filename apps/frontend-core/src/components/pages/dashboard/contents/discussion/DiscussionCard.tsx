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
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import { Switch } from '@/components/ui/switch'
import {
  useDeleteDiscussionMutation,
  useUpdateDiscussionMutation,
} from '@/redux/features/discussion/discussionApi'
import { IError } from '@/types/IError'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { FileEdit, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IDiscussion } from 'validation/types'

interface Props {
  discussion: IDiscussion
}

export default function DiscussionCard({ discussion }: Props) {
  const { token } = getIdAndToken()

  const [publishStatus, setpublishStatus] = useState(discussion?.status)
  const [showPublishPrompt, setshowPublishPrompt] = useState(false)
  const [showDeletePrompt, setshowDeletePrompt] = useState(false)

  const [updateDiscussion, { isLoading, isError, isSuccess, error }] =
    useUpdateDiscussionMutation()

  const [
    deleteDiscussion,
    {
      isLoading: isDeleting,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteDiscussionMutation()

  const onChangePublishStatus = () => {
    setshowPublishPrompt(true)
  }

  const handleUpdatePublishStatus = () => {
    updateDiscussion({
      id: discussion._id,
      payload: {
        published: !discussion.status,
      },
      token,
    })
  }

  const handleDeleteDiscussion = () => {
    deleteDiscussion({
      id: discussion._id,
      token,
    })
  }

  useEffect(() => {
    if (isLoading) toast.success('Updating Open Status!')
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) {
      toast.success('Updated Open Status Successfully!')
      setpublishStatus(prev => !prev)
    }

    if (isDeleting) toast.success('Deleting Discussion!')
    if (isDeleteError) toast.error((deleteError as IError)?.data?.message)
    if (isDeleteSuccess) toast.success('Discussion Deleted Successfully!')
  }, [
    isError,
    error,
    isSuccess,
    isLoading,
    deleteError,
    isDeleteError,
    isDeleteSuccess,
    isDeleting,
  ])

  return (
    <>
      <Card>
        <CardHeader className="p-3">
          <CardTitle className="text-lg">{discussion.topic}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="px-2 pt-3">
            <span className="font-semibold">Total comment: </span>
            {discussion.comments.length}
          </p>
          <div className="flex items-center justify-end gap-3 mr-3">
            <Label>Open</Label>
            <Switch
              checked={publishStatus}
              onCheckedChange={onChangePublishStatus}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-2 pb-2 pt-5 px-2">
          <ButtonExtended icon={<FileEdit />} type="submit">
            Edit Discussion
          </ButtonExtended>
          <ButtonExtended
            icon={<Trash2 />}
            variant="destructive"
            size="sm"
            onClick={() => setshowDeletePrompt(true)}
          >
            Delete Discussion
          </ButtonExtended>
        </CardFooter>
      </Card>

      <ConfirmationPrompt
        open={showPublishPrompt}
        onOpenChange={setshowPublishPrompt}
        cb={handleUpdatePublishStatus}
      />

      <ConfirmationPrompt
        open={showDeletePrompt}
        onOpenChange={setshowDeletePrompt}
        cb={handleDeleteDiscussion}
      />

      <Overlay isOpen={isDeleting} animationData={animationData} />
    </>
  )
}
