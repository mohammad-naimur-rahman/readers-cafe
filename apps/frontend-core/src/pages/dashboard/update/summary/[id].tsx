import animationData from '@/assets/lottie/savingFile.json'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import BookCard from '@/components/pages/dashboard/update/summary/BookCard'
import ButtonExtended from '@/components/ui/ButtonExtended'
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import { Switch } from '@/components/ui/switch'
import {
  useGetSummaryQuery,
  useUpdateSummaryMutation,
} from '@/redux/features/summary/summaryApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { FilePlus2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useId, useState } from 'react'
import toast from 'react-hot-toast'
import { ISummary } from 'validation/types'

const BlogEditor = dynamic(
  () => import('@/components/pages/dashboard/create/blog/BlogEditor'),
  {
    ssr: false,
  },
)

export default function UpdateSummaryPage() {
  const { query, push } = useRouter()
  const { token } = getIdAndToken()
  const formId = useId()

  const { data } = useGetSummaryQuery(query?.id)

  const [updateSummary, { isLoading, isError, error, isSuccess }] =
    useUpdateSummaryMutation()

  const [summaryContents, setsummaryContents] = useState<ISummary>({
    book: null,
    content: '',
    published: true,
    reviews: [],
  })

  const [content, setcontent] = useState('')

  useEffect(() => {
    if (data?.data) {
      setsummaryContents(data?.data)
      setcontent(data?.data?.content)
    }
  }, [data])

  const onChangePublishStatus = e => {
    setsummaryContents({ ...summaryContents, published: e })
  }

  const handleUpdateSummary = e => {
    e.preventDefault()
    if (!content) {
      toast.error('Please fill out the required fields!')
      return
    }

    updateSummary({
      payload: { ...summaryContents, content, book: summaryContents.book._id },
      token,
      id: query?.id,
    })
  }

  useEffect(() => {
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) {
      toast.success('Summary created successfully!')
      push('/dashboard/contents/summary')
    }
  }, [isSuccess, isError, error, push])

  return (
    <form
      className="max-w-4xl mx-auto space-y-5"
      onSubmit={handleUpdateSummary}
    >
      <h2 className="text-3xl pt-3">Update Summary</h2>
      <BookCard book={data?.data?.book} />
      <div className="space-y-2 flex flex-col">
        <Label htmlFor={`${formId}-summary`}>Summary *</Label>
        <BlogEditor blogContent={content} setblogContent={setcontent} />
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Switch
          id={`${formId}-published`}
          checked={summaryContents.published}
          onCheckedChange={onChangePublishStatus}
        />
        <Label htmlFor={`${formId}-published`}>Publish Summary</Label>
      </div>
      <div className="flex justify-end">
        <ButtonExtended type="submit" icon={<FilePlus2 />}>
          Create Summary
        </ButtonExtended>
      </div>
      <Overlay animationData={animationData} isOpen={isLoading} />
    </form>
  )
}

UpdateSummaryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Update Summary | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
