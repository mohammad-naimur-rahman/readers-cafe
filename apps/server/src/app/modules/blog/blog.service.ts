import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { SortOrder, startSession } from 'mongoose'
import { IBlog } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import calculatePagination from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { User } from '../user/user.model'
import { blogSearchableFields } from './blog.constants'
import { IBlogFilters } from './blog.interface'
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

const getAllBlogs = async (
  filters: IBlogFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBlog[]>> => {
  const { search, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const andConditions = []

  andConditions.push({ published: true })
  // Search needs $or for searching in specified fields
  if (search) {
    andConditions.push({
      $or: blogSearchableFields.map(field => ({
        [field]: {
          $regex: search,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Blog.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    .select('-user')

  const total = await Blog.find(whereConditions).count()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getAllUserBlogs = async (
  user: JwtPayload,
  filters: IBlogFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBlog[]>> => {
  const { search, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const andConditions = []

  andConditions.push({ user: user.userId })
  // Search needs $or for searching in specified fields
  if (search) {
    andConditions.push({
      $or: blogSearchableFields.map(field => ({
        [field]: {
          $regex: search,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Blog.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    .select('-user')

  const total = await Blog.find(whereConditions).count()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
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
