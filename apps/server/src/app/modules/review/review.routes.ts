import { Router } from 'express'
import { ReviewValidation } from 'validation/zod'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { ReviewController } from './review.controller'

const router = Router()

router
  .route('/')
  .get(authGuard(ENUM_USER_ROLE.ADMIN), ReviewController.getALllReviews)
  .post(
    validateRequest(ReviewValidation.CreateReviewZodSchema),
    authGuard(ENUM_USER_ROLE.USER),
    ReviewController.createReview,
  )

router
  .route('/:id')
  .get(authGuard(ENUM_USER_ROLE.ADMIN), ReviewController.getReview)
  .delete(authGuard(ENUM_USER_ROLE.ADMIN), ReviewController.deleteReview)

export const reviewRoutes = router
