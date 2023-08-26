import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { startSession } from 'mongoose'
import { IDiscussion } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { Discussion } from './discussion.model'

const createDiscussion = async (
  payload: IDiscussion,
  user: JwtPayload,
): Promise<IDiscussion> => {
  const session = await startSession()

  try {
    session.startTransaction()
    // user id is inserted separately so that anyone can't put wrong user
    const createdDiscussion = await Discussion.create(
      [{ user: user.userId, ...payload }],
      { session },
    )

    // add refernce to the user
    await User.updateOne(
      { _id: user.userId },
      { $push: { discussions: createdDiscussion[0]._id } },
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    await session.commitTransaction()

    return createdDiscussion[0]
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const getAllDiscussions = async (): Promise<IDiscussion[]> => {
  const alldiscussions = await Discussion.find()
  return alldiscussions
}

const getDiscussion = async (id: string): Promise<IDiscussion | null> => {
  const singleDiscussion = await Discussion.findById(id)
  return singleDiscussion
}

const updateDiscussion = async (
  id: string,
  payload: Partial<IDiscussion>,
  user: JwtPayload,
): Promise<IDiscussion | null> => {
  // checking if the same user is trying to dot the operation
  const discussion = await Discussion.findOne({ _id: id, user: user.userId })

  if (!discussion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found!')
  }

  // User can not be updated as the blog writer remains the same
  const { user: _, ...payloadData } = payload

  const updatedDiscussion = await Discussion.findByIdAndUpdate(
    id,
    payloadData,
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedDiscussion
}

const deleteDiscussion = async (
  id: string,
  user: JwtPayload,
): Promise<null> => {
  const session = await startSession()

  try {
    session.startTransaction()
    // check if the document exists and the same user is trying to dot the operation
    const discussion = await Discussion.findOne({ _id: id, user: user.userId })

    if (!discussion) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found!')
    }

    await Discussion.findByIdAndDelete(id, { session })

    // also delete the reference from user
    await User.updateOne(
      { _id: user.userId },
      { $pull: { discussions: id } },
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

export const DiscussionService = {
  createDiscussion,
  getAllDiscussions,
  updateDiscussion,
  getDiscussion,
  deleteDiscussion,
}
