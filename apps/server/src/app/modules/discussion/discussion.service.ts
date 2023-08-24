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
    // checking if the same user is trying to dot the operation
    if (user.userId !== payload.user) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'You are not allowed to do this operation!',
      )
    }
    const createdDiscussion = await Discussion.create([payload], { session })

    // add refernce to the user
    await User.findByIdAndUpdate(
      payload.user,
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
  const alldiscussions = await Discussion.find({ published: true })
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
  // check if the document exists
  const discussion = await Discussion.findById(id)

  if (!discussion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found!')
  }

  // checking if the same user is trying to dot the operation
  if (user.userId !== discussion.user.toString()) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not allowed to do this operation!',
    )
  }
  const updatedDiscussion = await Discussion.findOneAndUpdate(
    { _id: id },
    payload,
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
    // check if the document exists
    const discussion = await Discussion.findById(id)

    if (!discussion) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found!')
    }

    // checking if the same user is trying to dot the operation
    if (user.userId !== discussion.user.toString()) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'You are not allowed to do this operation!',
      )
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
