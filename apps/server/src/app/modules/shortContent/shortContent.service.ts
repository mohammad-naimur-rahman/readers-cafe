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

    // user id is inserted separately so that anyone can't put wrong user
    const createdShortContent = await ShortContent.create(
      [{ user: user.userId, ...payload }],
      {
        session,
      },
    )

    // add refernce to the user
    await User.updateOne(
      { _id: user.userId },
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

// TODO: add pagination and filters
const getAllUserShortContents = async (
  user: JwtPayload,
): Promise<IShortContent[]> => {
  const AllSummaries = await ShortContent.find({ user: user.userId })
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    .select('-user')
  return AllSummaries
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
  // checking if the same user is trying to dot the operation
  const shortContent = await ShortContent.findOne({
    _id: id,
    user: user.userId,
  })

  if (!shortContent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ShortContent not found')
  }
  // User can not be updated as the content writer remains the same
  const { user: _, ...payloadData } = payload

  const updatedShortContent = await ShortContent.findByIdAndUpdate(
    id,
    payloadData,
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
    // check if the document exists and the same user is trying to dot the operation
    const shortContent = await ShortContent.findOneAndDelete({
      _id: id,
      user: user.userId,
    })

    if (!shortContent) {
      throw new ApiError(httpStatus.NOT_FOUND, 'ShortContent not found')
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
  getAllUserShortContents,
  updateShortContent,
  getShortContent,
  deleteShortContent,
}
