import Typography from '@/components/ui/typrgraphy'
import { Star } from 'lucide-react'
import StarRatingComponent from 'react-star-rating-component'
import { IReview, IUser } from 'validation/types'

interface Props {
  review: IReview
}

export default function Review({ review }: Props) {
  return (
    <div className="py-3">
      <div className="flex gap-5">
        <Typography variant="h5">
          {(review?.user as IUser)?.fullName}
        </Typography>
        <StarRatingComponent
          name="reviewStar"
          starCount={5}
          value={review?.starRating}
          renderStarIcon={() => <Star />}
          className="[& label]:!cursor-default"
        />
      </div>
      <p className="text-lg pt-2">{review?.reviewText}</p>
    </div>
  )
}
