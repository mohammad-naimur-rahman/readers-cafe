/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IFilterableFieldsWithPopulatedFields,
  ILookupFields,
} from '../interfaces/common'

export const generateLookupStages = (lookupFields: ILookupFields) =>
  lookupFields.map(({ from, localField, foreignField, as }) => ({
    $lookup: {
      from,
      localField,
      foreignField,
      as,
    },
  }))

export const generateMatchQuery = (
  query: any,
  filterableFieldsWithPopulatedFields: IFilterableFieldsWithPopulatedFields,
  searchableFields: string[],
) => {
  const andQuery: any = []
  let orQuery: any = []

  filterableFieldsWithPopulatedFields.forEach(({ field, populatedField }) => {
    if (query[field]) {
      const filterQuery = {
        [populatedField]: { $regex: query[field], $options: 'i' },
      }
      andQuery.push(filterQuery)
    }
  })

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
  const { page = 1, limit = 10, sortBy = 'title', sortOrder = 'asc' } = query

  return {
    skip: (+page - 1) * +limit,
    limit: +limit,
    sort: { [sortBy as string]: sortOrder === 'desc' ? -1 : 1 },
    page,
  }
}
