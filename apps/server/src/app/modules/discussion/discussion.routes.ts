import { Router } from 'express'
import { DiscussionController } from './discussion.controller'

const router = Router()

router
  .route('/')
  .get(DiscussionController.getALllDiscussions)
  .post(DiscussionController.createDiscussion)

router
  .route('/:id')
  .get(DiscussionController.getALllDiscussions)
  .patch(DiscussionController.updateDiscussion)
  .delete(DiscussionController.deleteDiscussion)

export const discussionRoutes = router
