import { NextFunction, Response } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { RequestWithUser } from '../../interfaces/RequestResponseTypes'
import admin from '../../lib/firebaseConfig'
import { User } from '../modules/user/user.model'

export const authGuard =
  (requiredRoles: string[], isSameUser?: boolean) =>
  async (req: RequestWithUser, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      const accessToken = token?.split(' ')[1]

      if (!accessToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized!')
      }

      const decodedValue = await admin.auth().verifyIdToken(accessToken)

      if (requiredRoles.includes('admin') && !decodedValue.admin) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access!')
      }

      const { email } = decodedValue
      const userData = await User.findOne({ email })

      if (!userData) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'No User Found!')
      }

      console.log(req.body)

      // Admin can do anything, and it needs the same user to do the operations when auth is required
      if (
        isSameUser &&
        userData?.id !== req.body?.user &&
        !decodedValue.admin
      ) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Accen!')
      }

      req.user = userData
      next()
    } catch (err) {
      next(err)
    }
  }
