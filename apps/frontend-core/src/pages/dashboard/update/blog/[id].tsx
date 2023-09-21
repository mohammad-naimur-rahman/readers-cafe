import imageUploadingAnimation from '@/assets/lottie/imageUploading.json'
import animationData from '@/assets/lottie/savingFile.json'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ButtonExtended from '@/components/ui/ButtonExtended'
import { Button } from '@/components/ui/button'
import Img from '@/components/ui/img'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import { Switch } from '@/components/ui/switch'
import { initBlog } from '@/constants/dashboard/initValues'
import { initImage } from '@/constants/initImage'
import {
  useGetBlogQuery,
  useUpdateBlogMutation,
} from '@/redux/features/blog/blogApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { imageUploader } from '@/utils/imageUploader'
import { FilePlus2, X } from 'lucide-react'
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

export default function UpdateBlogPage() {
  const { push, query } = useRouter()
  const { token } = getIdAndToken()
  const formId = useId()

  const { data } = useGetBlogQuery(query?.id)
  const [updateBlog, { isLoading, isError, error, isSuccess }] =
    useUpdateBlogMutation()

  const [isImageUploading, setisImageUploading] = useState(false)

  const [blogContents, setblogContents] = useState<IBlog>(initBlog())

  const [blogContent, setblogContent] = useState()

  useEffect(() => {
    if (data?.data) {
      setblogContents(data?.data)
      setblogContent(data?.data?.blogContent)
    }
  }, [data])

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

  const handleUpdateBlog = e => {
    e.preventDefault()
    if (
      !blogContents.title ||
      !blogContents?.coverImage?.url ||
      !blogContents.blogContent
    ) {
      toast.error('Please fill out the required fields!')
      return
    }

    updateBlog({
      payload: { ...blogContents, blogContent },
      token,
      id: query?.id,
    })
  }

  useEffect(() => {
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) {
      push('/dashboard/contents/blog')
      toast.success('Blog created successfully!')
    }
  }, [isSuccess, isError, error, push])

  return (
    <form className="max-w-4xl mx-auto space-y-5" onSubmit={handleUpdateBlog}>
      <h2 className="text-3xl pt-3">Update Blog</h2>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-title`}>Title *</Label>
        <Input
          name="title"
          id={`${formId}-title`}
          placeholder="Blog title"
          value={blogContents.title}
          onChange={onChangeTitle}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-coverImage`} className="block">
          Cover Image *
        </Label>
        {blogContents?.coverImage?.url ? (
          <div className="inline-flex items-center justify-center gap-5 p-5">
            <Img
              src={blogContents.coverImage}
              alt="Cover Image"
              className="max-w-sm"
            />
            <Button
              variant="ghost"
              type="button"
              onClick={() =>
                setblogContents({ ...blogContents, coverImage: initImage })
              }
            >
              <X />
            </Button>
          </div>
        ) : (
          <Input
            type="file"
            accept="image/*"
            id={`${formId}-image`}
            onChange={handleCoverImage}
            className="max-w-xs"
          />
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-blogContent`}>Blog content *</Label>
        <BlogEditor blogContent={blogContent} setblogContent={setblogContent} />
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
          Update Blog
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

UpdateBlogPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Update Blog | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
