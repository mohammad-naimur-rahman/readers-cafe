import { Router } from 'express'
import { GenreController } from './genre.controller'

const router = Router()

router
  .route('/')
  .get(GenreController.getALllGenres)
  .post(GenreController.createGenre)

router
  .route('/:id')
  .get(GenreController.getGenre)
  .patch(GenreController.updateGenre)
  .delete(GenreController.deleteGenre)

export const genreRoutes = router
