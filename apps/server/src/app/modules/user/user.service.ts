import { IUser } from 'validation/types/IUser'
import User from './user.model'

const createUser = async (payload: IUser): Promise<IUser> => {
  const createdUser = await User.create(payload)
  return createdUser
}

const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find()
  return users
}

const UserService = {
  createUser,
  getAllUsers,
}

export default UserService
