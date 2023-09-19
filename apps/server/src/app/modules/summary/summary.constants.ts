import {
  IFilterableFieldsWithPopulatedFields,
  ILookupAndUnwindFields,
} from '../../../interfaces/common'

export const summaryFilterableFieldsWithPopulatedFields: IFilterableFieldsWithPopulatedFields =
  [
    {
      field: 'title',
      populatedField: 'book.title',
    },
    {
      field: 'published',
      populatedField: 'published',
    },
  ]

export const summaryLookupFileds: ILookupAndUnwindFields = [
  {
    from: 'books',
    localField: 'book',
    foreignField: '_id',
    as: 'book',
  },
  {
    unwind: '$book',
  },
  {
    from: 'authors',
    localField: 'book.authors',
    foreignField: '_id',
    as: 'book.authors',
  },
  {
    from: 'genres',
    localField: 'book.genre',
    foreignField: '_id',
    as: 'book.genre',
  },
]

export const summarySearchableFields: string[] = ['book.title']
