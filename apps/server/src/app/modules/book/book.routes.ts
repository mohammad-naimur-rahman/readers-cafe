import { Router } from 'express'
import { BookController } from './book.controller'

const router = Router()

router
  .route('/')
  .get(BookController.getALllBooks)
  .post(BookController.createBook)

router
  .route('/:id')
  .get(BookController.getBook)
  .patch(BookController.updateBook)
  .delete(BookController.deleteBook)

export const bookRoutes = router
