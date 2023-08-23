import { Router } from 'express'
import { AuthController } from './auth.controller'

const router = Router()

router.post('/login', AuthController.loginUser)
router.post('/signup', AuthController.signupUser)

export const authRoutes = router
