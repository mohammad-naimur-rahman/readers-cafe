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

  // Preventing the user from setting their role to admin
  if (payload.role === 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, `You can't set role to Admin`)
  }

  // const data = {
  //   fullName: payload.fullName,
  //   profilePicture: payload.profilePicture,
  //   bio: payload.bio,
  // }

  // const updatedUser = await User.findOneAndUpdate({ _id: id }, data, {
  //   new: true,
  //   runValidators: true,
  // })

  const updatedFields: Record<string, any> = {}

  // Add fields to update to the updatedFields object
  if (payload.fullName) updatedFields.fullName = payload.fullName
  if (payload.profilePicture)
    updatedFields.profilePicture = payload.profilePicture
  if (payload.bio) updatedFields.bio = payload.bio
  if (payload.socialMediaAccounts) {
    const { facebook, instagram, twitter, youtube, tiktok } =
      payload.socialMediaAccounts
    console.log(payload.socialMediaAccounts)
    updatedFields['socialMediaAccounts.facebook'] = facebook || ''
    updatedFields['socialMediaAccounts.instagram'] = instagram || ''
    updatedFields['socialMediaAccounts.twitter'] = twitter || ''
    updatedFields['socialMediaAccounts.youtube'] = youtube || ''
    updatedFields['socialMediaAccounts.tiktok'] = tiktok || ''
  }

  // Use findOneAndUpdate to update the specified fields in the document
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true, runValidators: true },
  )
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
