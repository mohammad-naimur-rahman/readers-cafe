import animationData from '@/assets/lottie/updating3.json'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ButtonExtended from '@/components/ui/ButtonExtended'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import { Textarea } from '@/components/ui/textarea'
import { initDiscussion } from '@/constants/dashboard/initValues'
import {
  useGetDiscussionQuery,
  useUpdateDiscussionMutation,
} from '@/redux/features/discussion/discussionApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { FileEdit } from 'lucide-react'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useId, useState } from 'react'
import { toast } from 'react-hot-toast'
import { IDiscussion } from 'validation/types'

export default function UpdateDiscussionPage() {
  const formId = useId()
  const { push, query } = useRouter()
  const { token } = getIdAndToken()

  const [discussion, setdiscussion] = useState<IDiscussion>(initDiscussion)

  const { data } = useGetDiscussionQuery(query?.id)

  useEffect(() => {
    if (data?.data) {
      setdiscussion(data?.data)
    }
  }, [data])

  const [updateDiscussion, { isLoading, isError, error, isSuccess }] =
    useUpdateDiscussionMutation()

  const handleUpdateDiscussion = e => {
    e.preventDefault()
    updateDiscussion({ token, payload: discussion, id: query?.id })
  }

  useEffect(() => {
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) toast.success('Discussion updated successfully!')
    if (isSuccess) {
      push('/dashboard/contents/discussion')
      toast.success('Discussion updated successfully!')
    }
  }, [isSuccess, isError, error, push])

  return (
    <>
      <form
        onSubmit={handleUpdateDiscussion}
        className="flex flex-col gap-2.5 justify-center mx-auto max-w-4xl"
      >
        <h2 className="text-3xl pt-3">Update Discussion</h2>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-topic`}>Topic *</Label>
          <Input
            id={`${formId}-topic`}
            value={discussion.topic}
            placeholder="Write down the Topic"
            onChange={e =>
              setdiscussion({ ...discussion, topic: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-description`}>Description</Label>
          <Textarea
            className="h-36"
            id={`${formId}-description`}
            value={discussion.description}
            placeholder="Write down the Description"
            onChange={e =>
              setdiscussion({ ...discussion, description: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end">
          <ButtonExtended type="submit" icon={<FileEdit />}>
            Update Discussion
          </ButtonExtended>
        </div>
      </form>
      <Overlay animationData={animationData} isOpen={isLoading} />
    </>
  )
}

UpdateDiscussionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Update Discussion | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
