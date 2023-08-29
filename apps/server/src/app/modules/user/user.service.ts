import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { IUser } from 'validation/types/IUser'
import ApiError from '../../../errors/ApiError'
import { User } from './user.model'

const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find()
  return users
}

const getUser = async (id: string, user: JwtPayload): Promise<IUser | null> => {
  // checking if the same user or admin is trying to dot the operation
  if (user.userId !== id && user.role !== 'admin') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      `You can't access this information!`,
    )
  }
  const singleUser = await User.findById(id)

  if (!singleUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  return singleUser
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
  user: JwtPayload,
): Promise<IUser | null> => {
  // checking if the same user is trying to dot the operation
  if (user.userId !== id) {
    throw new ApiError(httpStatus.FORBIDDEN, `You can't update this user!`)
  }

  // Preventing user to set their role to admin
  const data = {
    fullName: payload.fullName,
    profilePicture: payload.profilePicture,
    bio: payload.bio,
  }

  const updatedUser = await User.findOneAndUpdate({ _id: id }, data, {
    new: true,
    runValidators: true,
  })
  return updatedUser
}

const deleteUser = async (id: string): Promise<null> => {
  const user = await User.findByIdAndDelete(id)

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  return null
}

export const UserService = {
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
}
