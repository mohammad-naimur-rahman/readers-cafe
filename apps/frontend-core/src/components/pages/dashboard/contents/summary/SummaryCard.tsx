/* eslint-disable no-unsafe-optional-chaining */
import bookImage from '@/assets/images/book.png'
import animationData from '@/assets/lottie/deleting.json'
import ButtonExtended from '@/components/ui/ButtonExtended'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ConfirmationPrompt from '@/components/ui/dashboard/common/ConfirmationPrompt'
import Img, { LocalImg } from '@/components/ui/img'
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import { Switch } from '@/components/ui/switch'
import {
  useDeleteSummaryMutation,
  useUpdateSummaryMutation,
} from '@/redux/features/summary/summaryApi'
import { IError } from '@/types/IError'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IBook, IGenre, ISummary } from 'validation/types'
import ViewSummary from './ViewSummary'

interface Props {
  summary: ISummary
}

export default function SummaryCard({ summary }: Props) {
  const { token } = getIdAndToken()
  const { book } = summary

  const [publishStatus, setpublishStatus] = useState(summary?.published)
  const [showPublishPrompt, setshowPublishPrompt] = useState(false)
  const [showDeletePrompt, setshowDeletePrompt] = useState(false)

  const [updateSummary, { isLoading, isError, isSuccess, error }] =
    useUpdateSummaryMutation()

  const [
    deleteSummary,
    {
      isLoading: isDeleting,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteSummaryMutation()

  const onChangePublishStatus = () => {
    setshowPublishPrompt(true)
  }

  const handleUpdatePublishStatus = () => {
    updateSummary({
      id: summary._id,
      payload: {
        published: !summary.published,
      },
      token,
    })
  }

  const handleDeleteSummary = () => {
    deleteSummary({
      id: summary._id,
      token,
    })
  }

  useEffect(() => {
    if (isLoading) toast.success('Unpublishing Summary!')
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) {
      toast.success('Unpublished Summary Successfully!')
      setpublishStatus(prev => !prev)
    }

    if (isDeleting) toast.success('Deleting Summary!')
    if (isDeleteError) toast.error((deleteError as IError)?.data?.message)
    if (isDeleteSuccess) toast.success('Summary Deleted Successfully!')
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
          <CardTitle>{(book as IBook).title}</CardTitle>
          <CardDescription>
            <div className="flex py-1.5">
              {(book as IBook)?.authors?.map((author, i) => (
                <p key={author._id}>
                  {author?.fullName}
                  {(book as IBook)?.authors?.length - 1 !== i && (
                    <span>,&nbsp;</span>
                  )}
                </p>
              ))}
            </div>
            <p className="font-semibold text-primary">
              {((book as IBook)?.genre as unknown as IGenre)?.genre}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-w-[200px] mx-auto">
            {(book as IBook)?.image ? (
              <Img
                src={(book as IBook)?.image}
                alt={(book as IBook).title}
                className="aspect-book"
              />
            ) : (
              <LocalImg
                src={bookImage}
                alt={(book as IBook).title}
                className="aspect-book"
              />
            )}
          </div>

          <div className="px-2">
            <div className="flex items-center justify-between">
              <p>
                <span className="font-semibold">Total Reviews: </span>
                {summary.reviews.length}
              </p>
              {summary.reviews.length > 0 ? (
                <Button size="sm">View all reviews</Button>
              ) : null}

              {/* TODO: Add star rating on the top, position absolute */}
              {summary.reviews.length > 0 ? (
                <p>
                  <span className="font-semibold">Average Star Rating: </span>
                  {summary.averageStarRating}
                </p>
              ) : null}
            </div>
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
          <ViewSummary summary={summary.content} />
          <ButtonExtended
            icon={<Trash2 />}
            variant="destructive"
            size="sm"
            onClick={() => setshowDeletePrompt(true)}
          >
            Delete Summary
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
        cb={handleDeleteSummary}
      />

      <Overlay isOpen={isDeleting} animationData={animationData} />
    </>
  )
}
