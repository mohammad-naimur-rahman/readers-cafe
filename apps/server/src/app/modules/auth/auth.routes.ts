import { Router } from 'express'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import { AuthController } from './auth.controller'

const router = Router()

router.post('/login', AuthController.loginUser)
router.post('/signup', AuthController.signupUser)
router.patch(
  '/logout',
  authGuard([ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN]),
  AuthController.logoutUser,
)

export const authRoutes = router
