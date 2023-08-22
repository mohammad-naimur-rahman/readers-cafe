import { Router } from 'express'
import { SummaryController } from './summary.controller'

const router = Router()

router
  .route('/')
  .get(SummaryController.getALllSummaries)
  .post(SummaryController.createSummary)

router
  .route('/:id')
  .get(SummaryController.getSummary)
  .patch(SummaryController.updateSummary)
  .delete(SummaryController.deleteSummary)

export const summaryRoutes = router
