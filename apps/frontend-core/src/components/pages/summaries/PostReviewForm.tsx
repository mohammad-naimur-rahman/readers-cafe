import ButtonExtended from '@/components/ui/ButtonExtended'
import { Textarea } from '@/components/ui/textarea'
import { usePost } from '@/hooks/usePost'
import { IError } from '@/types/IError'
import { MessageCircle, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import StarRatingComponent from 'react-star-rating-component'
import { IReview, ISummary } from 'validation/types'

interface Props {
  id: string
  allReviews: IReview[]
  setallReviews: React.Dispatch<React.SetStateAction<IReview[]>>
}

export default function PostReviewForm({
  id,
  allReviews,
  setallReviews,
}: Props) {
  const [review, setreview] = useState<IReview>({
    starRating: 0,
    reviewText: '',
    summary: id as unknown as ISummary,
  })

  const [postReview, { isSuccess, error, isError, data }] = usePost('reviews')

  const handleUserReview = e => {
    e.preventDefault()

    if (!review.starRating) {
      toast.error('Please give a star review!')
      return
    }

    if (!review.reviewText) {
      toast.error('Please write a review!')
      return
    }

    postReview(review)
  }

  useEffect(() => {
    if (isSuccess) {
      setallReviews([data?.data, ...allReviews])
      toast.success('Review posted successfully!')
    }

    if (isError) {
      toast.error((error as IError)?.data?.message)
    }
  }, [isSuccess, isError, error])

  return (
    <form className="space-y-3.5" onSubmit={handleUserReview}>
      <StarRatingComponent
        name="rate1"
        starCount={5}
        value={review.starRating}
        renderStarIcon={() => <Star />}
        onStarClick={(starRating: number) =>
          setreview({ ...review, starRating })
        }
      />
      <Textarea
        placeholder="Write your review"
        value={review.reviewText}
        onChange={e => setreview({ ...review, reviewText: e.target.value })}
      />
      <ButtonExtended icon={<MessageCircle />} type="submit">
        Submit Review
      </ButtonExtended>
    </form>
  )
}
