import httpStatus from 'http-status'
import { IUser } from 'validation/types/IUser'
import { RequestWithUser } from '../../../interfaces/RequestResponseTypes'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'

const getALllUsers = catchAsync(async (req, res) => {
  const allUsers = await UserService.getAllUsers()
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    data: allUsers,
    message: 'All users retrieved successfully!',
  })
})

const getUser = catchAsync(async (req, res) => {
  const user = await UserService.getUser(
    req.params.id,
    (req as RequestWithUser).user,
  )
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    data: user,
    message: 'User retrieved successfully!',
  })
})

const updateUser = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedUser = await UserService.updateUser(
    id,
    body,
    (req as RequestWithUser).user,
  )
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    data: updatedUser,
    message: 'User updated successfully!',
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const deltedUser = await UserService.deleteUser(req.params.id)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.NO_CONTENT,
    data: deltedUser,
    message: 'User deleted successfully!',
  })
})

export const UserController = {
  getALllUsers,
  getUser,
  updateUser,
  deleteUser,
}
