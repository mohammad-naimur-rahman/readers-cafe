import httpStatus from 'http-status'
import { IBook } from 'validation/types'
import paginationFields from '../../../constants/pagination'
import { RequestWithUser } from '../../../interfaces/RequestResponseTypes'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { bookFilterableFields } from './book.constants'
import { BookService } from './book.service'

const createBook = catchAsync(async (req, res) => {
  const createdBook = await BookService.createBook(
    req.body,
    (req as RequestWithUser).user,
  )
  sendResponse<IBook>(res, {
    statusCode: httpStatus.CREATED,
    data: createdBook,
    message: 'Book created successfully!',
  })
})

const getALllBooks = catchAsync(async (req, res) => {
  const filters = pick(req.query, bookFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const allBooks = await BookService.getAllBooks(filters, paginationOptions)
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    data: allBooks.data,
    meta: allBooks.meta,
    message: 'All Books retrieved successfully!',
  })
})

const getBook = catchAsync(async (req, res) => {
  const Book = await BookService.getBook(req.params.id)
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    data: Book,
    message: 'Book retrieved successfully!',
  })
})

const updateBook = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedBook = await BookService.updateBook(id, body)
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    data: updatedBook,
    message: 'Book updated successfully!',
  })
})

const deleteBook = catchAsync(async (req, res) => {
  const deltedBook = await BookService.deleteBook(req.params.id)
  sendResponse<IBook>(res, {
    statusCode: httpStatus.NO_CONTENT,
    data: deltedBook,
    message: 'Book deleted successfully!',
  })
})

export const BookController = {
  createBook,
  getALllBooks,
  getBook,
  updateBook,
  deleteBook,
}
