import DashboardLayout from '@/components/layouts/DashboardLayout'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { withAuth } from '@/utils/auth/withAuth'
import dynamic from 'next/dynamic'
import { ReactElement, useId } from 'react'

const BlogEditor = dynamic(
  () => import('@/components/pages/dashboard/create/blog/BlogEditor'),
  {
    ssr: false,
  },
)

export default function CreateBlogPage() {
  const formId = useId()
  // const [blogContent, setblogContent] = useState<IBlog>({
  //   title: '',
  //   coverImage: {
  //     url: '',
  //     dominantColor: '',
  //   },
  //   blogContent: '',
  //   comments: [],
  // })
  return (
    <form className="max-w-4xl mx-auto space-y-5">
      <div className="space-y-2">
        <Label htmlFor={`${formId}-title`}>Title</Label>
        <Input name="title" id={`${formId}-title`} placeholder="Blog title" />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-coverImage`}>Cover Image</Label>
        <Input name="coverImage" type="file" id={`${formId}-coverImage`} />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-blogContent`}>Blog content</Label>
        {BlogEditor ? <BlogEditor /> : null}
      </div>
    </form>
  )
}

CreateBlogPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Profile | Reader's café">{page}</DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
