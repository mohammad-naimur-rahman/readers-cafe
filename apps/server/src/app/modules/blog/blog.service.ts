import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { startSession } from 'mongoose'
import { IBlog } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { Blog } from './blog.model'

const createBlog = async (payload: IBlog, user: JwtPayload): Promise<IBlog> => {
  const session = await startSession()
  session.startTransaction()

  try {
    // checking if the same user is trying to dot the operation
    if (user.userId !== payload.user) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'You are not allowed to do this operation!',
      )
    }
    const createdBlog = await Blog.create([payload], { session })

    // add refernce to the user
    await User.findByIdAndUpdate(
      payload.user,
      { $push: { blogs: createdBlog[0]._id } },
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    await session.commitTransaction()

    return createdBlog[0]
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const getAllBlogs = async (): Promise<IBlog[]> => {
  const allBlogs = await Blog.find({ published: true })
  return allBlogs
}

const getBlog = async (id: string): Promise<IBlog | null> => {
  const singleBlog = await Blog.findById(id)
  if (singleBlog?.published) {
    return singleBlog
  }
  return null
}

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>,
  user: JwtPayload,
): Promise<IBlog | null> => {
  // check if the document exists
  const blog = await Blog.findById(id)

  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!')
  }

  // checking if the same user is trying to dot the operation
  if (user.userId !== blog.user.toString()) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not allowed to do this operation!',
    )
  }
  const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return updatedBlog
}

const deleteBlog = async (id: string, user: JwtPayload): Promise<null> => {
  const session = await startSession()
  session.startTransaction()

  try {
    // check if the document exists
    const blog = await Blog.findById(id)

    if (!blog) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!')
    }

    // checking if the same user is trying to dot the operation
    if (user.userId !== blog.user.toString()) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'You are not allowed to do this operation!',
      )
    }

    await Blog.findByIdAndDelete(id, { session })

    // also delete the reference from user
    await User.updateOne(
      { _id: user.userId },
      { $pull: { blogs: id } },
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

export const BlogService = {
  createBlog,
  getAllBlogs,
  updateBlog,
  getBlog,
  deleteBlog,
}
