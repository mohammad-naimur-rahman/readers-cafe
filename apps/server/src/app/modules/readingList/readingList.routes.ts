import { Router } from 'express'
import { ReadingListValidation } from 'validation/zod'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { ReadingListController } from './readingList.controller'

const router = Router()

router
  .route('/')
  .get(authGuard(ENUM_USER_ROLE.USER), ReadingListController.getReadingList)
  .post(
    validateRequest(ReadingListValidation.CreateReadingListZodSchema),
    authGuard(ENUM_USER_ROLE.USER),
    ReadingListController.createReadingList,
  )

router
  .route('/:id')
  .patch(
    validateRequest(ReadingListValidation.UpdateReadingListZodSchema),
    authGuard(ENUM_USER_ROLE.USER),
    ReadingListController.updateReadingList,
  )
  .delete(
    authGuard(ENUM_USER_ROLE.USER),
    ReadingListController.deleteReadingList,
  )

export const readingListRoutes = router
