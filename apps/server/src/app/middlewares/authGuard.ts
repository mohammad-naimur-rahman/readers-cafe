import { NextFunction, Response } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { RequestWithUser } from '../../interfaces/RequestResponseTypes'
import admin from '../../lib/firebaseConfig'

export const authGuard =
  (...requiredRoles: string[]) =>
  async (req: RequestWithUser, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      const accessToken = token?.split(' ')[1]

      if (!accessToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized!')
      }

      const decodedValue = await admin.auth().verifyIdToken(accessToken)

      if (requiredRoles.includes('user') && decodedValue.role !== 'user') {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Accen!')
      }

      if (requiredRoles.includes('admin') && decodedValue.role !== 'admin') {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Accen!')
      }

      req.user = {
        email: decodedValue.email,
        role: decodedValue.admin ? 'admin' : 'user',
      }
      next()
    } catch (err) {
      next(err)
    }
  }
