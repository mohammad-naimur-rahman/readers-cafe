import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import httpStatus from 'http-status'
import { IAuth, IAuthUser, IUser } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import admin from '../../../lib/firebaseAdminConfig'
import { User } from '../user/user.model'

const signUpUser = async (
  authorization: string | undefined,
  payload: IUser,
): Promise<IAuthUser> => {
  const { email } = payload

  const token = authorization?.split(' ')[1]

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token missing!')
  }

  const decodedValue: DecodedIdToken = await admin.auth().verifyIdToken(token)

  if (decodedValue.email !== email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token!')
  }

  // Preventing user to set their role to admin
  const data = {
    fullName: payload.fullName,
    email: payload.email,
    profilePicture: payload.profilePicture,
    bio: payload.bio,
  }

  const isExist = await User.findOne({ email })

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist!')
  }

  const createdUser = await User.create(data)

  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!')
  }

  return {
    user: createdUser,
    token: {
      accessToken: authorization,
      iat: decodedValue.iat,
      exp: decodedValue.exp,
    },
  }
}

const loginUser = async (
  authorization: string | undefined,
  payload: IAuth,
): Promise<IAuthUser | null> => {
  const { email } = payload
  const token = authorization?.split(' ')[1]

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token missing!')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No user found with this email!')
  }

  const decodedValue: DecodedIdToken = await admin.auth().verifyIdToken(token)

  await admin.auth().setCustomUserClaims(decodedValue.uid, {
    admin: user.role === 'admin',
  })

  if (decodedValue.email !== email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token!')
  }

  return {
    user,
    token: {
      accessToken: authorization,
      iat: decodedValue.iat,
      exp: decodedValue.exp,
    },
  }
}

export const AuthService = {
  signUpUser,
  loginUser,
}
