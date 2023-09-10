import DashboardLayout from '@/components/layouts/DashboardLayout'
import ButtonExtended from '@/components/ui/ButtonExtended'
import Img from '@/components/ui/img'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateBlogMutation } from '@/redux/features/blogs/blogsApi'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { imageUploader } from '@/utils/imageUploader'
import { FilePlus2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { ReactElement, useEffect, useId, useState } from 'react'
import { toast } from 'react-hot-toast'
import { IBlog } from 'validation/types'

const BlogEditor = dynamic(
  () => import('@/components/pages/dashboard/create/blog/BlogEditor'),
  {
    ssr: false,
  },
)

export default function CreateBlogPage() {
  const { token } = getIdAndToken()
  const formId = useId()

  const [createBlog, { isLoading, isError, isSuccess }] =
    useCreateBlogMutation()

  const [blogContents, setblogContents] = useState<IBlog>({
    title: '',
    coverImage: {
      url: '',
      dominantColor: '',
    },
    blogContent: '',
    comments: [],
  })

  const onChangeTitle = e => {
    setblogContents({ ...blogContents, title: e.target.value })
  }

  const handleCoverImage = async e => {
    const result = await imageUploader(e)
    if (result) {
      setblogContents({ ...blogContents, coverImage: result })
    }
  }

  const handleCreateBlog = e => {
    e.preventDefault()
    createBlog({ payload: blogContents, token })
  }

  useEffect(() => {
    if (isError) toast.error('Something went wrong!')
    if (isSuccess) toast.success('Blog created successfully!')
    if (isLoading) toast.success('Blog creating!')
  }, [isSuccess, isError, isLoading])

  return (
    <form className="max-w-4xl mx-auto space-y-5" onSubmit={handleCreateBlog}>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-title`}>Title</Label>
        <Input
          name="title"
          id={`${formId}-title`}
          placeholder="Blog title"
          onChange={onChangeTitle}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-coverImage`}>Cover Image</Label>
        {blogContents.coverImage.url ? (
          <Img src={blogContents.coverImage} alt="Cover Image" />
        ) : (
          <Input
            name="coverImage"
            type="file"
            accept="image/*"
            id={`${formId}-coverImage`}
            onChange={handleCoverImage}
          />
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-blogContent`}>Blog content</Label>
        <BlogEditor
          blogContents={blogContents}
          setblogContents={setblogContents}
        />
      </div>
      <div className="flex items-center justify-end">
        <ButtonExtended icon={<FilePlus2 />} type="submit">
          Create Blog
        </ButtonExtended>
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
