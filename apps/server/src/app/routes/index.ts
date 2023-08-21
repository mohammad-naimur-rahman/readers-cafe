import { Router } from 'express'
import { activityRoutes } from '../modules/activity/activity.routes'
import { userRoutes } from '../modules/user/user.routes'

const router = Router()

const allRoutes = [
  { path: '/user', routes: userRoutes },
  { path: '/activity', routes: activityRoutes },
]

allRoutes.forEach(({ path, routes }) => router.use(path, routes))

export default router
