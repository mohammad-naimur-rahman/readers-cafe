import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { SortOrder, Types } from 'mongoose'
import { IBook } from 'validation/types'
import ApiError from '../../../errors/ApiError'
import calculatePagination from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { Author } from '../author/author.model'
import { Genre } from '../genre/genre.model'
import { bookSearchableFields } from './book.constants'
import { IBookFilters } from './book.interface'
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

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)

  const { search, ...filtersData } = filters

  const andConditions = []

  if (search) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
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

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const allBooks = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('authors')
    .populate('genre')

  return {
    meta: {
      page,
      limit,
      total: allBooks.length,
    },
    data: allBooks,
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
