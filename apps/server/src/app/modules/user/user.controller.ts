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

const UserController = {
  createUser,
  getALllUsers,
}

export default UserController
