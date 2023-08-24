import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import { IAuth, IAuthUser, IUser } from 'validation/types'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import admin from '../../../lib/firebaseConfig'
import { User } from '../user/user.model'
import { TokenVersion } from './tokenVersionModule'

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
  const { _id: userId, role } = createdUser

  const createdTokenVersion = await TokenVersion.create({
    user: userId,
  })

  const accessToken = jwtHelpers.createToken(
    { userId, role, tokenVersion: createdTokenVersion.tokenVersion },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  return {
    user: createdUser,
    token: {
      accessToken,
      refreshToken,
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

  if (decodedValue.email !== email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token!')
  }
  const { _id: userId, role } = user

  const currentTokenVersion = await TokenVersion.findOne({
    user: userId,
  })

  if (!currentTokenVersion) {
    throw new ApiError(httpStatus.BAD_REQUEST, `User probably did't sign up!`)
  }

  const accessToken = jwtHelpers.createToken(
    { userId, role, tokenVersion: currentTokenVersion.tokenVersion },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  return {
    user,
    token: {
      accessToken,
      refreshToken,
    },
  }
}

const logoutUser = async (user: IUser) => {
  const currentTokenVersion = await TokenVersion.findOne({
    user: user._id,
  })

  if (!currentTokenVersion) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token Version not found!')
  }

  await TokenVersion.findOneAndUpdate(
    { user: user._id },
    { tokenVersion: +currentTokenVersion.tokenVersion + 1 },
    { new: true },
  )
  return null
}

export const AuthService = {
  signUpUser,
  loginUser,
  logoutUser,
}
