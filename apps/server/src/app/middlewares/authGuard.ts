import { NextFunction, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import { RequestWithUser } from '../../interfaces/RequestResponseTypes'
import { TokenVersion } from '../modules/auth/tokenVersionModule'
import { User } from '../modules/user/user.model'

export const authGuard =
  (requiredRoles: string[], isSameUser?: boolean) =>
  async (req: RequestWithUser, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized!')
      }

      const accessToken = token?.split(' ')[1]

      const verifiedUser = jwtHelpers.verifyToken(
        accessToken,
        config.jwt.secret as Secret,
      )

      const { role, userId, tokenVersion } = verifiedUser

      const currentTokenVersion = await TokenVersion.findOne({ user: userId })

      if (!currentTokenVersion) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access!')
      }

      // If user logs out, it updates the token version and next time the previous token doesn't work
      if (currentTokenVersion?.tokenVersion !== tokenVersion) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You have logged out!')
      }
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access!')
      }

      const userData = await User.findById(userId)

      if (!userData) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'No User Found!')
      }

      // Admin can do anything, and it needs the same user to do the operations when auth is required
      if (isSameUser && userData?.id !== req.body?.user && role !== 'admin') {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access!')
      }

      req.user = userData
      next()
    } catch (err) {
      next(err)
    }
  }
