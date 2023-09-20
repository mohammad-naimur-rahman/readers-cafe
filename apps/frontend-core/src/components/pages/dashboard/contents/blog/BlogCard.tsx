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
import Img from '@/components/ui/img'
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import { Switch } from '@/components/ui/switch'
import {
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} from '@/redux/features/blog/blogApi'
import styles from '@/styles/markdown.module.scss'
import { IError } from '@/types/IError'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { splitMarkdown } from '@/utils/splitMarkdown'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import { IBlog } from 'validation/types'
import ViewBlog from './ViewBlog'

interface Props {
  blog: IBlog
}

export default function BlogCard({ blog }: Props) {
  const { token } = getIdAndToken()
  const [publishStatus, setpublishStatus] = useState(blog?.published)
  const [showPublishPrompt, setshowPublishPrompt] = useState(false)
  const [showDeletePrompt, setshowDeletePrompt] = useState(false)

  const [updateBlog, { isLoading, isError, isSuccess, error }] =
    useUpdateBlogMutation()

  const [
    deleteBlog,
    {
      isLoading: isDeleting,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteBlogMutation()

  const onChangePublishStatus = () => {
    setshowPublishPrompt(true)
  }

  const handleUpdatePublishStatus = () => {
    updateBlog({
      id: blog._id,
      payload: {
        published: !blog.published,
      },
      token,
    })
  }

  const handleDeleteBlog = () => {
    deleteBlog({
      id: blog._id,
      token,
    })
  }

  useEffect(() => {
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) {
      toast.success('Updated Publish Status!')
      setpublishStatus(prev => !prev)
    }

    if (isDeleting) toast.success('Deleting Blog!')
    if (isDeleteError) toast.error((deleteError as IError)?.data?.message)
    if (isDeleteSuccess) toast.success('Blog Deleted Successfully!')
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
        <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Img
            src={blog?.coverImage}
            alt={blog.title}
            className="aspect-blog"
          />
          <p className="px-2 pt-3">
            <span className="font-semibold">Total comment: </span>
            {blog.comments.length}
          </p>
          <div className="p-2">
            <ReactMarkdown className={styles.markdown}>
              {splitMarkdown(blog.blogContent, 200)}
            </ReactMarkdown>
          </div>

          <div className="flex items-center justify-end gap-3 mr-3">
            <Label>Publish</Label>
            <Switch
              checked={publishStatus}
              onCheckedChange={onChangePublishStatus}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-2 pb-2 pt-5 px-2">
          <ViewBlog blog={blog} />
          <ButtonExtended
            icon={<Trash2 />}
            variant="destructive"
            size="sm"
            onClick={() => setshowDeletePrompt(true)}
          >
            Delete Blog
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
        cb={handleDeleteBlog}
      />

      <Overlay isOpen={isDeleting} animationData={animationData} />
    </>
  )
}
