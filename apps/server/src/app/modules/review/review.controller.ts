import httpStatus from 'http-status'
import { IReview } from 'validation/types'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ReviewService } from './review.service'

const createReview = catchAsync(async (req, res) => {
  const createdReview = await ReviewService.createReview(req.body)
  sendResponse<IReview>(res, {
    statusCode: httpStatus.CREATED,
    data: createdReview,
    message: 'Review created successfully!',
  })
})

const getALllReviews = catchAsync(async (req, res) => {
  const allReviews = await ReviewService.getAllReviews()
  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    data: allReviews,
    message: 'All Reviews retrieved successfully!',
  })
})

const getReview = catchAsync(async (req, res) => {
  const Review = await ReviewService.getReview(req.params.id)
  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    data: Review,
    message: 'Review retrieved successfully!',
  })
})

const updateReview = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedReview = await ReviewService.updateReview(id, body)
  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    data: updatedReview,
    message: 'Review updated successfully!',
  })
})

const deleteReview = catchAsync(async (req, res) => {
  const deltedReview = await ReviewService.deleteReview(req.params.id)
  sendResponse<IReview>(res, {
    statusCode: httpStatus.NO_CONTENT,
    data: deltedReview,
    message: 'Review deleted successfully!',
  })
})

export const ReviewController = {
  createReview,
  getALllReviews,
  getReview,
  updateReview,
  deleteReview,
}
