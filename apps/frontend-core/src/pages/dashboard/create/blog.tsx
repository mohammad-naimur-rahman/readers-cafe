import imageUploadingAnimation from '@/assets/lottie/imageUploading.json'
import animationData from '@/assets/lottie/savingFile.json'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ButtonExtended from '@/components/ui/ButtonExtended'
import Img from '@/components/ui/img'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import { Switch } from '@/components/ui/switch'
import { useCreateBlogMutation } from '@/redux/features/blog/blogApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { imageUploader } from '@/utils/imageUploader'
import { FilePlus2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
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
  const { push } = useRouter()
  const { token } = getIdAndToken()
  const formId = useId()

  const [createBlog, { isLoading, isError, error, isSuccess }] =
    useCreateBlogMutation()

  const [isImageUploading, setisImageUploading] = useState(false)

  const [blogContents, setblogContents] = useState<IBlog>({
    title: '',
    coverImage: {
      url: '',
      dominantColor: '',
    },
    blogContent: '',
    published: true,
    comments: [],
  })

  const onChangeTitle = e => {
    setblogContents({ ...blogContents, title: e.target.value })
  }

  const handleCoverImage = async e => {
    setisImageUploading(true)
    const result = await imageUploader(e)
    if (result) {
      setisImageUploading(false)
      setblogContents({ ...blogContents, coverImage: result })
    } else {
      setisImageUploading(false)
      toast.error('Image upload failed!')
    }
  }

  const onChangePublishStatus = e => {
    setblogContents({ ...blogContents, published: e })
  }

  const handleCreateBlog = e => {
    e.preventDefault()
    if (
      !blogContents.title ||
      !blogContents.coverImage ||
      !blogContents.blogContent
    ) {
      toast.error('Please fill out the required fields!')
      return
    }

    createBlog({ payload: blogContents, token })
  }

  useEffect(() => {
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) {
      push('/dashboard/contents/blog')
      toast.success('Blog created successfully!')
    }
    if (isLoading) toast.success('Blog creating!')
  }, [isSuccess, isError, isLoading, error, push])

  return (
    <form className="max-w-4xl mx-auto space-y-5" onSubmit={handleCreateBlog}>
      <h2 className="text-3xl pt-3">Create Blog</h2>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-title`}>Title *</Label>
        <Input
          name="title"
          id={`${formId}-title`}
          placeholder="Blog title"
          onChange={onChangeTitle}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-coverImage`}>Cover Image *</Label>
        {blogContents.coverImage.url ? (
          <Img src={blogContents.coverImage} alt="Cover Image" />
        ) : (
          <Input
            name="coverImage"
            type="file"
            accept="image/*"
            id={`${formId}-coverImage`}
            onChange={handleCoverImage}
            required
          />
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-blogContent`}>Blog content *</Label>
        <BlogEditor
          blogContents={blogContents}
          setblogContents={setblogContents}
        />
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Switch
          id={`${formId}-published`}
          checked={blogContents.published}
          onCheckedChange={onChangePublishStatus}
        />
        <Label htmlFor={`${formId}-published`}>Publish Blog</Label>
      </div>
      <div className="flex items-center justify-end">
        <ButtonExtended icon={<FilePlus2 />} type="submit">
          Create Blog
        </ButtonExtended>
      </div>
      <Overlay animationData={animationData} isOpen={isLoading} />
      <Overlay
        animationData={imageUploadingAnimation}
        isOpen={isImageUploading}
      />
    </form>
  )
}

CreateBlogPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Create Blog | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
