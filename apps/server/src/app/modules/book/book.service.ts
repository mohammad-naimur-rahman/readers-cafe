/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
import { IBook } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import {
  generateLookupStages,
  generateMatchQuery,
  generatePaginationFields,
} from '../../../helpers/aggregateHelpers'
import { IGenericResponse } from '../../../interfaces/common'
import { Author } from '../author/author.model'
import { Genre } from '../genre/genre.model'
import {
  bookFilterableFieldsWithPopulatedFields,
  bookLookupFileds,
  bookSearchableFields,
} from './book.constants'
import { Book } from './book.model'

const createBook = async (payload: IBook, user: JwtPayload): Promise<IBook> => {
  const { authors, genre, ...payloadData } = payload
  let genreId
  const authorIds: string[] = []

  if (Types.ObjectId.isValid(genre.toString() as string)) {
    genreId = genre
  } else {
    const newGenreid = await Genre.create({ genre })
    genreId = newGenreid._id.toString()
  }

  const createAuthor = async (fullName: string): Promise<void> => {
    let authorId
    if (Types.ObjectId.isValid(fullName)) {
      const isExist = await Author.findById(fullName)
      if (!isExist) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          'No author found with this id!',
        )
      }
      authorId = fullName
    } else {
      const newAuthor = await Author.create({ fullName })
      authorId = newAuthor._id.toString()
    }
    authorIds.push(authorId)
  }

  const promises = authors.map(author => createAuthor(author.toString()))

  await Promise.all(promises)

  const createdBook = await Book.create({
    user: user.userId,
    genre: genreId,
    authors: authorIds,
    ...payloadData,
  })
  return createdBook
}

const getAllBooks = async (query: any): Promise<IGenericResponse<IBook[]>> => {
  const matchQuery = generateMatchQuery(
    query,
    bookFilterableFieldsWithPopulatedFields,
    bookSearchableFields,
  )

  const lookupStages = generateLookupStages(bookLookupFileds)

  const totalQuery = [
    ...lookupStages,
    { $match: matchQuery },
    { $count: 'total' }, // Use $count to calculate the total count
  ]

  const totalResult = await Book.aggregate(totalQuery)
  const total = totalResult.length > 0 ? totalResult[0].total : 0

  const { skip, limit, sort, page } = generatePaginationFields(query)

  const summaries = await Book.aggregate([
    ...lookupStages,
    { $match: matchQuery },
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

const getBook = async (id: string): Promise<IBook | null> => {
  const singleBook = await Book.findById(id)
    .populate('authors')
    .populate('genre')
  return singleBook
}

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const updatedBook = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return updatedBook
}

const deleteBook = async (id: string): Promise<IBook | null> => {
  const deletedBook = await Book.findByIdAndDelete(id)
  return deletedBook
}

export const BookService = {
  createBook,
  getAllBooks,
  updateBook,
  getBook,
  deleteBook,
}
