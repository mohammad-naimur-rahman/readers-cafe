import { Router } from 'express'

const router = Router()

const moduleRoutes = [
  {
    path: '/api/v1',
    route: router,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
