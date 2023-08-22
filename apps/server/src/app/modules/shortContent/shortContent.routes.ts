import { Router } from 'express'
import { ShortContentController } from './shortContent.controller'

const router = Router()

router
  .route('/')
  .get(ShortContentController.getALllShortContents)
  .post(ShortContentController.createShortContent)

router
  .route('/:id')
  .get(ShortContentController.getShortContent)
  .patch(ShortContentController.updateShortContent)
  .delete(ShortContentController.deleteShortContent)

export const shortContentRoutes = router
