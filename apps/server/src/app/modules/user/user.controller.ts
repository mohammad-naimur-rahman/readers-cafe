import httpStatus from 'http-status'
import { IUser } from 'validation/types/IUser'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import UserService from './user.service'

const createUser = catchAsync(async (req, res) => {
  const createdUser = await UserService.createUser(req.body)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    data: createdUser,
    message: 'User created successfully!',
  })
})

const getALllUsers = catchAsync(async (req, res) => {
  const allUsers = await UserService.getAllUsers()
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    data: allUsers,
    message: 'All users retrieved successfully!',
  })
})

const getUser = catchAsync(async (req, res) => {
  const user = await UserService.getUser(req.params.id)
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
  const updatedUser = await UserService.updateUser(id, body)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    data: updatedUser,
    message: 'User updated successfully!',
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const allUsers = await UserService.deleteUser(req.params.id)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    data: allUsers,
    message: 'User deleted successfully!',
  })
})

const UserController = {
  createUser,
  getALllUsers,
  getUser,
  updateUser,
  deleteUser,
}

export default UserController
