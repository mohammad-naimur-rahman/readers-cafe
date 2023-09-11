import { Router } from 'express'
import { GenreValidation } from 'validation/zod'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { GenreController } from './genre.controller'

const router = Router()

router
  .route('/')
  .get(GenreController.getALllGenres)
  .post(
    validateRequest(GenreValidation.CreateGenreZodSchema),
    authGuard(ENUM_USER_ROLE.ADMIN),
    GenreController.createGenre,
  )

router
  .route('/:id')
  .get(GenreController.getGenre)
  .patch(
    validateRequest(GenreValidation.UpdateGenreZodSchema),
    authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    GenreController.updateGenre,
  )
  .delete(authGuard(ENUM_USER_ROLE.ADMIN), GenreController.deleteGenre)

export const genreRoutes = router
