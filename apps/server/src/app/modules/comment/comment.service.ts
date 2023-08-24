import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { startSession } from 'mongoose'
import { IComment } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import { Blog } from '../blog/blog.model'
import { Discussion } from '../discussion/discussion.model'
import { ShortContent } from '../shortContent/shortContent.model'
import { Comment } from './comment.model'

const createComment = async (
  payload: IComment,
  user: JwtPayload,
): Promise<IComment> => {
  const session = await startSession()
  try {
    session.startTransaction()

    if (user.userId !== payload.user) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'You are not allowed to do this operation!',
      )
    }

    const createdComment = await Comment.create([payload], { session })

    switch (createdComment[0].commentFor) {
      case 'blog':
        await Blog.findByIdAndUpdate(
          createdComment[0].blog,
          {
            $push: { comments: createdComment[0]._id },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        )
        break
      case 'discussion':
        await Discussion.findByIdAndUpdate(
          createdComment[0].discussion,
          {
            $push: { comments: createdComment[0]._id },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        )
        break
      case 'shortContent':
        await ShortContent.findByIdAndUpdate(
          createdComment[0].shortContent,
          {
            $push: { comments: createdComment[0]._id },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        )
        break
      default:
        break
    }

    await session.commitTransaction()

    return createdComment[0]
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const getAllComments = async (): Promise<IComment[]> => {
  const AllComments = await Comment.find()
  return AllComments
}

const getComment = async (id: string): Promise<IComment | null> => {
  const singleComment = await Comment.findById(id)
  return singleComment
}

const deleteComment = async (id: string): Promise<IComment | null> => {
  const session = await startSession()
  try {
    session.startTransaction()
    // check if the document exists
    const comment = await Comment.findById(id)

    if (!comment) {
      throw new ApiError(httpStatus.NOT_FOUND, 'comment not found!')
    }

    await Comment.findByIdAndDelete(id, { session })

    switch (comment.commentFor) {
      case 'blog':
        await Blog.findByIdAndUpdate(
          comment.blog,
          {
            $pull: { comments: comment._id },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        )
        break
      case 'discussion':
        await Discussion.findByIdAndUpdate(
          comment.discussion,
          {
            $pull: { comments: comment._id },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        )
        break

      case 'shortContent':
        await ShortContent.findByIdAndUpdate(
          comment.shortContent,
          {
            $pull: { comments: comment._id },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        )
        break

      default:
        break
    }

    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }

  const deletedComment = await Comment.findByIdAndDelete(id)
  return deletedComment
}

export const CommentService = {
  createComment,
  getAllComments,
  getComment,
  deleteComment,
}
