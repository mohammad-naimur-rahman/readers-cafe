import { Router } from 'express'
import { CommentValidation } from 'validation/zod'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { CommentController } from './comment.controller'

const router = Router()

router
  .route('/')
  .get(authGuard(ENUM_USER_ROLE.ADMIN), CommentController.getALllComments)
  .post(
    validateRequest(CommentValidation.CreateCommentZodSchema),
    authGuard(ENUM_USER_ROLE.USER),
    CommentController.createComment,
  )

router
  .route('/:id')
  .get(authGuard(ENUM_USER_ROLE.ADMIN), CommentController.getALllComments)
  .delete(authGuard(ENUM_USER_ROLE.ADMIN), CommentController.deleteComment)

export const commentRoutes = router
