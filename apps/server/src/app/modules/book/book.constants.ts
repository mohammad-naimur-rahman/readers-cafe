import {
  IFilterableFieldsWithPopulatedFields,
  ILookupFields,
} from '../../../interfaces/common'

export const bookFilterableFieldsWithPopulatedFields: IFilterableFieldsWithPopulatedFields =
  [
    {
      field: 'title',
      populatedField: 'title',
    },
    {
      field: 'publicationYear',
      populatedField: 'publicationYear',
    },
    {
      field: 'genre',
      populatedField: 'genre.genre',
    },
    {
      field: 'author',
      populatedField: 'authors.fullName',
    },
  ]

export const bookLookupFileds: ILookupFields = [
  {
    from: 'genres',
    localField: 'genre',
    foreignField: '_id',
    as: 'genre',
  },
  {
    from: 'authors',
    localField: 'authors',
    foreignField: '_id',
    as: 'authors',
  },
]

export const bookSearchableFields: string[] = [
  'title',
  'publicationYear',
  'genre.genre',
  'authors.fullName',
]
