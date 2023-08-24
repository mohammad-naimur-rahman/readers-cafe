import { Router } from 'express'
import { AuthController } from './auth.controller'

const router = Router()

router.post('/login', AuthController.loginUser)
router.post('/signup', AuthController.signupUser)
router.patch('/logout', AuthController.logoutUser)

export const authRoutes = router
