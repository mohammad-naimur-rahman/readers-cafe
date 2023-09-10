import animationData from '@/assets/lottie/savingFile.json'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import AddBookForSummary from '@/components/pages/dashboard/create/summary.tsx/AddBookForSummary'
import ButtonExtended from '@/components/ui/ButtonExtended'
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import { useCreateSummaryMutation } from '@/redux/features/summary/summaryApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { FilePlus2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { ReactElement, useEffect, useId, useState } from 'react'
import toast from 'react-hot-toast'
import { ISummary } from 'validation/types'

const BlogEditor = dynamic(
  () => import('@/components/pages/dashboard/create/blog/BlogEditor'),
  {
    ssr: false,
  },
)

export default function CreateSummaryPage() {
  const { token } = getIdAndToken()
  const formId = useId()

  const [createSummary, { isLoading, isError, error, isSuccess }] =
    useCreateSummaryMutation()

  const [summaryContents, setsummaryContents] = useState<ISummary>({
    book: null,
    content: '',
    published: true,
    reviews: [],
  })

  const handleCreateSummary = e => {
    e.preventDefault()
    if (!summaryContents.book || !summaryContents.content) {
      toast.error('Please fill out the required fields!')
      return
    }

    createSummary({ payload: summaryContents, token })
  }

  useEffect(() => {
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) toast.success('Summary created successfully!')
    if (isLoading) toast.success('Summary creating!')
  }, [isSuccess, isError, isLoading, error])

  return (
    <form
      className="max-w-4xl mx-auto space-y-5"
      onSubmit={handleCreateSummary}
    >
      <h2 className="text-3xl pt-3">Create Summary</h2>
      <div className="space-y-2 flex flex-col relative">
        <Label htmlFor={`${formId}-title`}>Book *</Label>
        <AddBookForSummary />
      </div>
      <div className="space-y-2 flex flex-col">
        <Label htmlFor={`${formId}-summary`}>Summary *</Label>
        <BlogEditor
          blogContents={summaryContents}
          setblogContents={setsummaryContents}
        />
      </div>
      <div className="flex justify-end">
        <ButtonExtended type="submit" icon={<FilePlus2 />}>
          Create Short Content
        </ButtonExtended>
      </div>
      <Overlay animationData={animationData} isOpen={isLoading} />
    </form>
  )
}

CreateSummaryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Create Summary | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})