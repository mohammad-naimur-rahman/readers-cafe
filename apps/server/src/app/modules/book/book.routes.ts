import { Router } from 'express'
import { BookValidation } from 'validation/zod'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { BookController } from './book.controller'

const router = Router()

router
  .route('/')
  .get(BookController.getALllBooks)
  .post(
    validateRequest(BookValidation.CreateBookZodSchema),
    authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    BookController.createBook,
  )

router
  .route('/:id')
  .get(BookController.getBook)
  .patch(
    validateRequest(BookValidation.CreateBookZodSchema),
    authGuard(ENUM_USER_ROLE.USER),
    BookController.updateBook,
  )
  .delete(authGuard(ENUM_USER_ROLE.ADMIN), BookController.deleteBook)

export const bookRoutes = router
