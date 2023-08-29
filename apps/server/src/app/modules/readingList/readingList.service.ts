import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { startSession } from 'mongoose'
import { IReadingList } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { ReadingList } from './readingList.model'

const createReadingList = async (
  payload: IReadingList,
  user: JwtPayload,
): Promise<IReadingList> => {
  const session = await startSession()

  try {
    session.startTransaction()

    // user id is inserted separately so that anyone can't put wrong user
    const createdReadingList = await ReadingList.create(
      [{ user: user.userId, ...payload }],
      { session },
    )

    // add refernce to the user
    await User.updateOne(
      { _id: user.userId },
      { $push: { readingList: createdReadingList[0]._id } },
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    await session.commitTransaction()

    return createdReadingList[0]
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const getReadingList = async (
  user: JwtPayload,
): Promise<IReadingList | null> => {
  const singleReadingList = await ReadingList.findOne({ user: user.userId })
  return singleReadingList
}

const updateReadingList = async (
  id: string,
  payload: Partial<IReadingList>,
  user: JwtPayload,
): Promise<IReadingList | null> => {
  // checking if the same user is trying to dot the operation
  const discussion = await ReadingList.findOne({ _id: id, user: user.userId })

  if (!discussion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reading list not found!')
  }

  // User can only update reading status
  const { status } = payload

  const updatedReadingList = await ReadingList.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedReadingList
}

const deleteReadingList = async (
  id: string,
  user: JwtPayload,
): Promise<null> => {
  const session = await startSession()
  try {
    session.startTransaction()

    // check if the document exists and the same user is trying to dot the operation
    const deletedReadingList = await ReadingList.findOneAndDelete({
      _id: id,
      user: user.userid,
    })

    if (!deletedReadingList) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found!')
    }

    // also delete the reference from user
    await User.updateOne(
      { _id: user.userId },
      { $pull: { readingList: id } },
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

export const ReadingListService = {
  createReadingList,
  updateReadingList,
  getReadingList,
  deleteReadingList,
}
