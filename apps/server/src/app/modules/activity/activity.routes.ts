import { Router } from 'express'
import { ActivityController } from './activity.controller'

const router = Router()

router
  .route('/')
  .get(ActivityController.getALllActivities)
  .post(ActivityController.createActivity)

router
  .route('/:id')
  .get(ActivityController.getActivity)
  .patch(ActivityController.updateActivity)
  .delete(ActivityController.deleteActivity)

export const activityRoutes = router
