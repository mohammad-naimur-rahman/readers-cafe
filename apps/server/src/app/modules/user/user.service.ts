import { IUser } from 'validation/types/IUser'
import { User } from './user.model'

const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find()
  return users
}

const getUser = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id)
  return user
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
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

const deleteUser = async (id: string): Promise<IUser | null> => {
  const user = await User.findByIdAndDelete(id)
  return user
}

export const UserService = {
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
}
