import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { SortOrder, startSession } from 'mongoose'
import { IShortContent } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import calculatePagination from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { User } from '../user/user.model'
import { shortContentSearchableFields } from './shortContent.constants'
import { IShortContentFilters } from './shortContent.interface'
import { ShortContent } from './shortContent.model'

const createShortContent = async (
  payload: IShortContent,
  user: JwtPayload,
): Promise<IShortContent> => {
  const session = await startSession()

  try {
    session.startTransaction()

    // user id is inserted separately so that anyone can't put wrong user
    const createdShortContent = await ShortContent.create(
      [{ user: user.userId, ...payload }],
      {
        session,
      },
    )

    // add refernce to the user
    await User.updateOne(
      { _id: user.userId },
      { $push: { shortContents: createdShortContent[0]._id } },
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    await session.commitTransaction()

    return createdShortContent[0]
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const getAllShortContents = async (
  filters: IShortContentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IShortContent[]>> => {
  const { search, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const andConditions = []
  // Search needs $or for searching in specified fields
  if (search) {
    andConditions.push({
      $or: shortContentSearchableFields.map(field => ({
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

  const result = await ShortContent.find(whereConditions)
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

  const total = await ShortContent.find(whereConditions).count()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getAllUserShortContents = async (
  user: JwtPayload,
  filters: IShortContentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IShortContent[]>> => {
  const { search, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const andConditions = []

  andConditions.push({ user: user.userId })
  // Search needs $or for searching in specified fields
  if (search) {
    andConditions.push({
      $or: shortContentSearchableFields.map(field => ({
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

  const result = await ShortContent.find(whereConditions)
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

  const total = await ShortContent.find(whereConditions).count()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }

  // const AllSummaries = await ShortContent.find({ user: user.userId })
  //   .populate({
  //     path: 'comments',
  //     populate: {
  //       path: 'user',
  //     },
  //   })
  //   .select('-user')
  // return AllSummaries
}

const getShortContent = async (id: string): Promise<IShortContent | null> => {
  const singleShortContent = await ShortContent.findById(id)
  return singleShortContent
}

const updateShortContent = async (
  id: string,
  payload: Partial<IShortContent>,
  user: JwtPayload,
): Promise<IShortContent | null> => {
  // checking if the same user is trying to dot the operation
  const shortContent = await ShortContent.findOne({
    _id: id,
    user: user.userId,
  })

  if (!shortContent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ShortContent not found')
  }
  // User can not be updated as the content writer remains the same
  const { user: _, ...payloadData } = payload

  const updatedShortContent = await ShortContent.findByIdAndUpdate(
    id,
    payloadData,
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedShortContent
}

const deleteShortContent = async (
  id: string,
  user: JwtPayload,
): Promise<null> => {
  const session = await startSession()

  try {
    session.startTransaction()
    // check if the document exists and the same user is trying to dot the operation
    const shortContent = await ShortContent.findOneAndDelete({
      _id: id,
      user: user.userId,
    })

    if (!shortContent) {
      throw new ApiError(httpStatus.NOT_FOUND, 'ShortContent not found')
    }

    await ShortContent.findByIdAndDelete(id)

    // also delete the reference from user
    await User.updateOne(
      { _id: user.userId },
      { $pull: { shortContents: id } },
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

export const ShortContentService = {
  createShortContent,
  getAllShortContents,
  getAllUserShortContents,
  updateShortContent,
  getShortContent,
  deleteShortContent,
}
