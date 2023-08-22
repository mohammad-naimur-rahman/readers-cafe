import { Router } from 'express'
import { CommentController } from './comment.controller'

const router = Router()

router
  .route('/')
  .get(CommentController.getALllComments)
  .post(CommentController.createComment)

router
  .route('/:id')
  .get(CommentController.getALllComments)
  .patch(CommentController.updateComment)
  .delete(CommentController.deleteComment)

export const commentRoutes = router
