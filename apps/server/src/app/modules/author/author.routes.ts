import { Router } from 'express'
import { AuthorValidation } from 'validation/zod'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { AuthorController } from './author.controller'

const router = Router()

router
  .route('/')
  .get(AuthorController.getALllAuthors)
  .post(
    validateRequest(AuthorValidation.CreateAuthorZodSchema),
    authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    AuthorController.createAuthor,
  )

router
  .route('/:id')
  .get(AuthorController.getAuthor)
  .patch(
    validateRequest(AuthorValidation.UpdateAuthorZodSchema),
    authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    AuthorController.updateAuthor,
  )
  .delete(authGuard(ENUM_USER_ROLE.ADMIN), AuthorController.deleteAuthor)

export const authorRoutes = router
