import { Router } from 'express'
import { ShortContentValidation } from 'validation/zod'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { ShortContentController } from './shortContent.controller'

const router = Router()

router
  .route('/')
  .get(ShortContentController.getALllShortContents)
  .post(
    validateRequest(ShortContentValidation.CreateShortContentZodSchema),
    authGuard(ENUM_USER_ROLE.USER),
    ShortContentController.createShortContent,
  )

router.get(
  '/my-contents',
  authGuard(ENUM_USER_ROLE.USER),
  ShortContentController.getALllUserShortContents,
)

router
  .route('/:id')
  .get(ShortContentController.getShortContent)
  .patch(
    validateRequest(ShortContentValidation.UpdateShortContentZodSchema),
    authGuard(ENUM_USER_ROLE.USER),
    ShortContentController.updateShortContent,
  )
  .delete(
    authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    ShortContentController.deleteShortContent,
  )

export const shortContentRoutes = router
