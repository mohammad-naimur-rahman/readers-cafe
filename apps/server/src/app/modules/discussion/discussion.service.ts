import { IDiscussion } from 'validation/types'
import { Discussion } from './discussion.model'

const createDiscussion = async (payload: IDiscussion): Promise<IDiscussion> => {
  const createdDiscussion = await Discussion.create(payload)
  return createdDiscussion
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

const deleteDiscussion = async (id: string): Promise<IDiscussion | null> => {
  const deletedDiscussion = await Discussion.findByIdAndDelete(id)
  return deletedDiscussion
}

export const DiscussionService = {
  createDiscussion,
  getAllDiscussions,
  updateDiscussion,
  getDiscussion,
  deleteDiscussion,
}
