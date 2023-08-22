import { Router } from 'express'
import { ReadingListController } from './readingList.controller'

const router = Router()

router
  .route('/')
  .get(ReadingListController.getALllReadingLists)
  .post(ReadingListController.createReadingList)

router
  .route('/:id')
  .get(ReadingListController.getReadingList)
  .patch(ReadingListController.updateReadingList)
  .delete(ReadingListController.deleteReadingList)

export const readingListRoutes = router
