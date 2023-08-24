import { startSession } from 'mongoose'
import { IBlog, IUser } from 'validation/types'
import { User } from '../user/user.model'
import { Blog } from './blog.model'

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const session = await startSession()
  session.startTransaction()

  try {
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
  const AllBlogs = await Blog.find({ published: true })
  return AllBlogs
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
): Promise<IBlog | null> => {
  const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return updatedBlog
}

const deleteBlog = async (id: string, user: IUser): Promise<IBlog | null> => {
  const session = await startSession()
  session.startTransaction()

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id, { session })

    // also delete the reference from user
    await User.updateOne(
      { _id: user._id },
      { $pull: { blogs: id } },
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    await session.commitTransaction()

    return deletedBlog
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
