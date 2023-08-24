import { Router } from 'express'
import { DiscussionValidation } from 'validation/zod'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { DiscussionController } from './discussion.controller'

const router = Router()

router
  .route('/')
  .get(DiscussionController.getALllDiscussions)
  .post(
    validateRequest(DiscussionValidation.CreateDiscussionZodSchema),
    authGuard([ENUM_USER_ROLE.USER], true),
    DiscussionController.createDiscussion,
  )

router
  .route('/:id')
  .get(DiscussionController.getALllDiscussions)
  .patch(DiscussionController.updateDiscussion)
  .delete(DiscussionController.deleteDiscussion)

export const discussionRoutes = router
