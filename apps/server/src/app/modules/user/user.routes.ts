import { Router } from 'express'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import { UserController } from './user.controller'

const router = Router()

router
  .route('/')
  .get(authGuard(ENUM_USER_ROLE.ADMIN), UserController.getALllUsers)

router
  .route('/:id')
  .get(
    authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    UserController.getUser,
  )
  .patch(authGuard(ENUM_USER_ROLE.USER), UserController.updateUser)
  .delete(authGuard(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)

export const userRoutes = router
