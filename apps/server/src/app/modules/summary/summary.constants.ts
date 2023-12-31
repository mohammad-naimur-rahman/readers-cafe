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
      field: 'genre',
      populatedField: 'book.genre',
    },
    {
      field: 'published',
      populatedField: 'published',
    },
    {
      field: 'createdAt',
      populatedField: 'createdAt',
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

export const summarySearchableFields: string[] = ['book.title', 'book.genre']
