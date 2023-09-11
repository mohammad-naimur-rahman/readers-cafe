import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { startSession } from 'mongoose'
import { IBlog } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import { Blog } from './blog.model'

const createBlog = async (payload: IBlog, user: JwtPayload): Promise<IBlog> => {
  const session = await startSession()

  try {
    session.startTransaction()

    // user id is inserted separately so that anyone can't put wrong user
    const createdBlog = await Blog.create([{ user: user.userId, ...payload }], {
      session,
    })

    // add refernce to the user
    await User.updateOne(
      { _id: user.userId },
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

// TODO: add pagination and filters
const getAllUserBlogs = async (user: JwtPayload): Promise<IBlog[]> => {
  const AllSummaries = await Blog.find({ user: user.userId })
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    .select('-user')
  return AllSummaries
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
  // check if the document exists and the same user is trying to dot the operation
  const blog = await Blog.findOne({ _id: id, user: user.userId })

  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!')
  }

  // User can not be updated as the blog writer remains the same
  const { user: _, ...payloadData } = payload

  const updatedBlog = await Blog.findByIdAndUpdate(id, payloadData, {
    new: true,
    runValidators: true,
  })
  return updatedBlog
}

const deleteBlog = async (id: string, user: JwtPayload): Promise<null> => {
  const session = await startSession()

  try {
    session.startTransaction()

    // check if the document exists and the same user is trying to dot the operation
    const blog = await Blog.findOne({ _id: id, user: user.userId })

    if (!blog) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!')
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
  getAllUserBlogs,
  updateBlog,
  getBlog,
  deleteBlog,
}
