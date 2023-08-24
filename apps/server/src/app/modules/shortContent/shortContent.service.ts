import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { startSession } from 'mongoose'
import { IShortContent } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { ShortContent } from './shortContent.model'

const createShortContent = async (
  payload: IShortContent,
  user: JwtPayload,
): Promise<IShortContent> => {
  const session = await startSession()

  try {
    session.startTransaction()
    // checking if the same user is trying to dot the operation
    if (user.userId !== payload.user) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'You are not allowed to do this operation!',
      )
    }
    const createdShortContent = await ShortContent.create([payload], {
      session,
    })

    // add refernce to the user
    await User.findByIdAndUpdate(
      payload.user,
      { $push: { shortContents: createdShortContent[0]._id } },
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    await session.commitTransaction()

    return createdShortContent[0]
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const getAllShortContents = async (): Promise<IShortContent[]> => {
  const AllShortContents = await ShortContent.find()
  return AllShortContents
}

const getShortContent = async (id: string): Promise<IShortContent | null> => {
  const singleShortContent = await ShortContent.findById(id)
  return singleShortContent
}

const updateShortContent = async (
  id: string,
  payload: Partial<IShortContent>,
  user: JwtPayload,
): Promise<IShortContent | null> => {
  const shortContent = await ShortContent.findById(id)

  if (!shortContent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ShortContent not found')
  }

  // checking if the same user is trying to dot the operation
  if (user.userId !== shortContent.user.toString()) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not allowed to do this operation!',
    )
  }
  const updatedShortContent = await ShortContent.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedShortContent
}

const deleteShortContent = async (
  id: string,
  user: JwtPayload,
): Promise<null> => {
  const session = await startSession()

  try {
    session.startTransaction()

    const shortContent = await ShortContent.findById(id)

    if (!shortContent) {
      throw new ApiError(httpStatus.NOT_FOUND, 'ShortContent not found')
    }

    // checking if the same user is trying to dot the operation
    if (user.userId !== shortContent.user.toString()) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'You are not allowed to do this operation!',
      )
    }
    await ShortContent.findByIdAndDelete(id)

    // also delete the reference from user
    await User.updateOne(
      { _id: user.userId },
      { $pull: { shortContents: id } },
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    await session.commitTransaction()

    return null
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

export const ShortContentService = {
  createShortContent,
  getAllShortContents,
  updateShortContent,
  getShortContent,
  deleteShortContent,
}
