import { IReview } from 'validation/types'
import { Review } from './review.model'

const createReview = async (payload: IReview): Promise<IReview> => {
  const createdReview = await Review.create(payload)
  return createdReview
}

const getAllReviews = async (): Promise<IReview[]> => {
  const AllReviews = await Review.find()
  return AllReviews
}

const getReview = async (id: string): Promise<IReview | null> => {
  const singleReview = await Review.findById(id)
  return singleReview
}

const updateReview = async (
  id: string,
  payload: Partial<IReview>,
): Promise<IReview | null> => {
  const updatedReview = await Review.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return updatedReview
}

const deleteReview = async (id: string): Promise<IReview | null> => {
  const deletedReview = await Review.findByIdAndDelete(id)
  return deletedReview
}

export const ReviewService = {
  createReview,
  getAllReviews,
  updateReview,
  getReview,
  deleteReview,
}
