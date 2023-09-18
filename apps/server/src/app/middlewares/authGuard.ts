import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import { RequestWithUser } from '../../interfaces/RequestResponseTypes'
import { TokenVersion } from '../modules/auth/tokenVersionModule'

export const authGuard =
  (...requiredRoles: string[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized!')
      }

      const accessToken = token?.split(' ')[1]

      if (accessToken === 'undefined') {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized!')
      }

      const verifiedUser = jwtHelpers.verifyToken(
        accessToken,
        config.jwt.secret as Secret,
      )

      const { role, userId, tokenVersion } = verifiedUser

      const currentTokenVersion = await TokenVersion.findOne({
        user: userId,
      })

      if (!currentTokenVersion) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You may need to sign up!')
      }

      // If user logs out, it updates the token version and next time the previous token doesn't work
      if (currentTokenVersion?.tokenVersion !== tokenVersion) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You have logged out!')
      }

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access!')
      }

      ;(req as RequestWithUser).user = verifiedUser
      next()
    } catch (err) {
      next(err)
    }
  }
