/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose'
import { IFilterableFieldsWithPopulatedFields } from '../interfaces/common'
import { isValidObjectId } from '../utils/isValidObjectId'

export const generateLookupStages = (lookupFields: any) =>
  lookupFields.map(({ from, localField, foreignField, as, unwind }: any) => {
    if (unwind) {
      return {
        $unwind: unwind,
      }
    }

    return {
      $lookup: {
        from,
        localField,
        foreignField,
        as,
      },
    }
  })

export const generateMatchQuery = (
  query: any,
  filterableFieldsWithPopulatedFields: IFilterableFieldsWithPopulatedFields,
  searchableFields: string[],
  userId?: string,
) => {
  const andQuery: any = []
  let orQuery: any = []

  filterableFieldsWithPopulatedFields.forEach(({ field, populatedField }) => {
    if (query[field] === 'true') {
      andQuery.push({ [populatedField]: true })
    } else if (query[field] === 'false') {
      andQuery.push({ [populatedField]: false })
    } else if (isValidObjectId(query[field])) {
      andQuery.push({ [populatedField]: new Types.ObjectId(query[field]) })
    } else if (query[field]) {
      const filterQuery = {
        [populatedField]: { $regex: query[field], $options: 'i' },
      }
      andQuery.push(filterQuery)
    }
  })

  if (userId) {
    andQuery.push({ user: new Types.ObjectId(userId) })
  }

  if (query.search) {
    orQuery = searchableFields.map(field => ({
      [field]: { $regex: query.search, $options: 'i' },
    }))
  }

  const matchQuery: any = {}

  if (andQuery.length) {
    matchQuery.$and = andQuery
  }

  if (orQuery.length) {
    matchQuery.$or = orQuery
  }

  return matchQuery
}

type SortStage = {
  $sort: Record<string, 1 | -1>
}

interface PaginationFields {
  skip: number
  limit: number
  page: number
  sort: SortStage['$sort']
}

export const generatePaginationFields = (query: any): PaginationFields => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'asc',
  } = query

  return {
    skip: (+page - 1) * +limit,
    limit: +limit,
    sort: { [sortBy as string]: sortOrder === 'desc' ? -1 : 1 },
    page: +page,
  }
}
