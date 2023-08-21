import { Router } from 'express'
import { UserController } from './user.controller'

const router = Router()

router
  .route('/')
  .get(UserController.getALllUsers)
  .post(UserController.createUser)

router
  .route('/:id')
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser)

export const userRoutes = router
