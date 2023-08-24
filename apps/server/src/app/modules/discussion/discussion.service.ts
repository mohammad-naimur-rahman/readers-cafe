import { JwtPayload } from 'jsonwebtoken'
import { startSession } from 'mongoose'
import { IDiscussion } from 'validation/types'
import { User } from '../user/user.model'
import { Discussion } from './discussion.model'

const createDiscussion = async (payload: IDiscussion): Promise<IDiscussion> => {
  const session = await startSession()
  session.startTransaction()

  try {
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
  const AllDiscussions = await Discussion.find()
  return AllDiscussions
}

const getDiscussion = async (id: string): Promise<IDiscussion | null> => {
  const singleDiscussion = await Discussion.findById(id)
  return singleDiscussion
}

const updateDiscussion = async (
  id: string,
  payload: IDiscussion,
): Promise<IDiscussion | null> => {
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
): Promise<IDiscussion | null> => {
  const session = await startSession()
  session.startTransaction()

  try {
    const deletedDiscussion = await Discussion.findByIdAndDelete(id, {
      session,
    })

    // also delete the reference from user
    await User.updateOne(
      { _id: user._id },
      { $pull: { discussions: id } },
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    await session.commitTransaction()

    return deletedDiscussion
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
