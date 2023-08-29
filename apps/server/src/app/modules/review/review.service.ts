import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { startSession } from 'mongoose'
import { IReview } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import { Summary } from '../summary/summary.model'
import { Review } from './review.model'

const createReview = async (
  payload: IReview,
  user: JwtPayload,
): Promise<IReview> => {
  const session = await startSession()

  try {
    session.startTransaction()
    // user id is inserted separately so that anyone can't put wrong user
    const createdReview = await Review.create(
      [{ user: user.userId, ...payload }],
      { session },
    )

    // add refernce to the summary
    await Summary.findByIdAndUpdate(
      createdReview[0].summary,
      { $push: { reviews: createdReview[0]._id } },
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    await session.commitTransaction()

    return createdReview[0]
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const getAllReviews = async (): Promise<IReview[]> => {
  const AllReviews = await Review.find()
  return AllReviews
}

const getReview = async (id: string): Promise<IReview | null> => {
  const singleReview = await Review.findById(id)
  return singleReview
}

const deleteReview = async (id: string): Promise<IReview | null> => {
  const session = await startSession()
  try {
    session.startTransaction()

    // check if the document exists
    const review = await Review.findById(id)

    if (!review) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Review not found!')
    }

    await Review.findByIdAndDelete(id, { session })

    // remove refernce to the summary
    await Summary.findByIdAndUpdate(
      review.summary,
      { $pull: { reviews: review._id } },
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    await session.commitTransaction()

    return null
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

export const ReviewService = {
  createReview,
  getAllReviews,
  getReview,
  deleteReview,
}
