import { Router } from 'express'
import { ReviewController } from './review.controller'

const router = Router()

router
  .route('/')
  .get(ReviewController.getALllReviews)
  .post(ReviewController.createReview)

router
  .route('/:id')
  .get(ReviewController.getReview)
  .patch(ReviewController.updateReview)
  .delete(ReviewController.deleteReview)

export const reviewRoutes = router
