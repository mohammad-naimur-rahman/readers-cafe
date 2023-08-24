import httpStatus from 'http-status'
import { IAuthUser, IUser } from 'validation/types'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AuthService } from './auth.service'

const signupUser = catchAsync(async (req, res) => {
  const {
    headers: { authorization },
    body,
  } = req

  const authCredentials = await AuthService.signUpUser(authorization, body)

  if (!authCredentials) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials!')
  }

  const { token } = authCredentials

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', token.refreshToken, cookieOptions)
  res.cookie('accessToken', token.accessToken, cookieOptions)

  sendResponse<IAuthUser>(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Signin successfull!',
    data: authCredentials,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const {
    headers: { authorization },
    body,
  } = req

  const authCredentials = await AuthService.loginUser(authorization, body)

  if (!authCredentials) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials!')
  }

  const { token } = authCredentials

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', token.refreshToken, cookieOptions)
  res.cookie('accessToken', token.accessToken, cookieOptions)

  sendResponse<IAuthUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login successfull!',
    data: authCredentials,
  })
})

const logoutUser = catchAsync(async (req, res) => {
  await AuthService.logoutUser(req.body.id)
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: 'Logout successfull!',
    data: null,
  })
})

export const AuthController = {
  signupUser,
  loginUser,
  logoutUser,
}
