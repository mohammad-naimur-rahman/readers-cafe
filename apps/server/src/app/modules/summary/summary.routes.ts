import { Router } from 'express'
import { SummaryValidation } from 'validation/zod'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { SummaryController } from './summary.controller'

const router = Router()

router
  .route('/')
  .get(SummaryController.getALllSummaries)
  .post(
    validateRequest(SummaryValidation.CreateSummaryZodSchema),
    authGuard(ENUM_USER_ROLE.USER),
    SummaryController.createSummary,
  )

router.get(
  '/my-contents',
  authGuard(ENUM_USER_ROLE.USER),
  SummaryController.getALllUserSummaries,
)

router
  .route('/:id')
  .get(SummaryController.getSummary)
  .patch(
    validateRequest(SummaryValidation.UpdateSummaryZodSchema),
    authGuard(ENUM_USER_ROLE.USER),
    SummaryController.updateSummary,
  )
  .delete(
    authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    SummaryController.deleteSummary,
  )

export const summaryRoutes = router
