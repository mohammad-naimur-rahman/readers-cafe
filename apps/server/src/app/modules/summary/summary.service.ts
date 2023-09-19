import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { startSession } from 'mongoose'
import { ISummary } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import {
  generateLookupStages,
  generateMatchQuery,
  generatePaginationFields,
} from '../../../helpers/aggregateHelpers'
import { IGenericResponse } from '../../../interfaces/common'
import { User } from '../user/user.model'
import {
  summaryFilterableFieldsWithPopulatedFields,
  summaryLookupFileds,
  summarySearchableFields,
} from './summary.constants'
import { Summary } from './summary.model'

const createSummary = async (
  payload: ISummary,
  user: JwtPayload,
): Promise<ISummary> => {
  const session = await startSession()

  try {
    session.startTransaction()

    // user id is inserted separately so that anyone can't put wrong user
    const createdSummary = await Summary.create(
      [{ user: user.userId, ...payload }],
      {
        session,
      },
    )

    // add refernce to the user
    await User.updateOne(
      { _id: user.userId },
      { $push: { summaries: createdSummary[0]._id } },
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    await session.commitTransaction()

    return createdSummary[0]
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const getAllSummaries = async (
  query: any,
): Promise<IGenericResponse<ISummary[]>> => {
  const matchQuery = generateMatchQuery(
    query,
    summaryFilterableFieldsWithPopulatedFields,
    summarySearchableFields,
  )

  const lookupStages = generateLookupStages(summaryLookupFileds)

  const totalQuery = [
    ...lookupStages,
    { $match: matchQuery },
    { $count: 'total' },
  ]

  const totalResult = await Summary.aggregate(totalQuery)
  const total = totalResult.length > 0 ? totalResult[0].total : 0

  const { skip, limit, sort, page } = generatePaginationFields(query)

  const summaries = await Summary.aggregate([
    ...lookupStages,
    {
      $match: matchQuery,
    },
    { $skip: skip },
    { $limit: limit },
    { $sort: sort },
  ])

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: summaries,
  }
}

const getAllUserSummeries = async (
  user: JwtPayload,
  query: any,
): Promise<IGenericResponse<ISummary[]>> => {
  const matchQuery = generateMatchQuery(
    query,
    summaryFilterableFieldsWithPopulatedFields,
    summarySearchableFields,
    user.userId,
  )

  const lookupStages = generateLookupStages(summaryLookupFileds)

  const totalQuery = [
    ...lookupStages,
    { $match: matchQuery },
    { $count: 'total' },
  ]

  const totalResult = await Summary.aggregate(totalQuery)
  const total = totalResult.length > 0 ? totalResult[0].total : 0

  const { skip, limit, sort, page } = generatePaginationFields(query)

  const summaries = await Summary.aggregate([
    ...lookupStages,
    {
      $match: matchQuery,
    },
    { $skip: skip },
    { $limit: limit },
    { $sort: sort },
  ])

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: summaries,
  }
}

const getSummary = async (id: string): Promise<ISummary | null> => {
  const singleSummary = await Summary.findById(id)
  return singleSummary
}

const updateSummary = async (
  id: string,
  payload: Partial<ISummary>,
  user: JwtPayload,
): Promise<ISummary | null> => {
  // checking if the same user is trying to dot the operation
  const summary = await Summary.findOne({ _id: id, user: user.userId })

  if (!summary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Summary not found!')
  }

  // User can not be updated as the discussion writer remains the same
  const { user: _, ...payloadData } = payload

  const updatedSummary = await Summary.findByIdAndUpdate(id, payloadData, {
    new: true,
    runValidators: true,
  })

  return updatedSummary
}

const deleteSummary = async (
  id: string,
  user: JwtPayload,
): Promise<ISummary | null> => {
  const session = await startSession()

  try {
    session.startTransaction()

    // check if the document exists and the same user is trying to dot the operation
    const summary = await Summary.findOneAndDelete({
      _id: id,
      user: user.userId,
    })

    if (!summary) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Summary not found!')
    }

    // also delete the reference from user
    await User.updateOne(
      { _id: user.userId },
      { $pull: { summaries: id } },
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

export const SummaryService = {
  createSummary,
  getAllSummaries,
  getAllUserSummeries,
  updateSummary,
  getSummary,
  deleteSummary,
}
