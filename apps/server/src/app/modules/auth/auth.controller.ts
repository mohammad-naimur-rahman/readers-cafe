import httpStatus from 'http-status'
import { IAuthUser } from 'validation/types'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AuthService } from './auth.service'

const signupUser = catchAsync(async (req, res) => {
  const {
    headers: { authorization },
    body,
  } = req

  const user = await AuthService.signUpUser(authorization, body)

  sendResponse<IAuthUser>(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Signin successfull!',
    data: user,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const {
    headers: { authorization },
    body,
  } = req

  const user = await AuthService.loginUser(authorization, body)

  sendResponse<IAuthUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login successfull!',
    data: user,
  })
})

export const AuthController = {
  signupUser,
  loginUser,
}
