import { Router } from 'express'
import { AuthorController } from './author.controller'

const router = Router()

router
  .route('/')
  .get(AuthorController.getALllAuthors)
  .post(AuthorController.createAuthor)

router
  .route('/:id')
  .get(AuthorController.getAuthor)
  .patch(AuthorController.updateAuthor)
  .delete(AuthorController.deleteAuthor)

export const authorRoutes = router
