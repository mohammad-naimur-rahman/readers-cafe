import { Router } from 'express'
import UserController from './user.controller'

const router = Router()

router
  .route('/')
  .get(UserController.getALllUsers)
  .post(UserController.createUser)

export default router
