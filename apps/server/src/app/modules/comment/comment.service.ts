import { IComment } from 'validation/types'
import { Comment } from './comment.model'

const createComment = async (payload: IComment): Promise<IComment> => {
  const createdComment = await Comment.create(payload)
  return createdComment
}

const getAllComments = async (): Promise<IComment[]> => {
  const AllComments = await Comment.find()
  return AllComments
}

const getComment = async (id: string): Promise<IComment | null> => {
  const singleComment = await Comment.findById(id)
  return singleComment
}

const updateComment = async (
  id: string,
  payload: Partial<IComment>,
): Promise<IComment | null> => {
  const updatedComment = await Comment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return updatedComment
}

const deleteComment = async (id: string): Promise<IComment | null> => {
  const deletedComment = await Comment.findByIdAndDelete(id)
  return deletedComment
}

export const CommentService = {
  createComment,
  getAllComments,
  updateComment,
  getComment,
  deleteComment,
}
