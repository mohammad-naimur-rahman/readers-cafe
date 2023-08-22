import httpStatus from 'http-status'
import { IAuthor } from 'validation/types'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AuthorService } from './author.service'

const createAuthor = catchAsync(async (req, res) => {
  const createdAuthor = await AuthorService.createAuthor(req.body)
  sendResponse<IAuthor>(res, {
    statusCode: httpStatus.CREATED,
    data: createdAuthor,
    message: 'Author created successfully!',
  })
})

const getALllAuthors = catchAsync(async (req, res) => {
  const allAuthors = await AuthorService.getAllAuthors()
  sendResponse<IAuthor[]>(res, {
    statusCode: httpStatus.OK,
    data: allAuthors,
    message: 'All Authors retrieved successfully!',
  })
})

const getAuthor = catchAsync(async (req, res) => {
  const Author = await AuthorService.getAuthor(req.params.id)
  sendResponse<IAuthor>(res, {
    statusCode: httpStatus.OK,
    data: Author,
    message: 'Author retrieved successfully!',
  })
})

const updateAuthor = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedAuthor = await AuthorService.updateAuthor(id, body)
  sendResponse<IAuthor>(res, {
    statusCode: httpStatus.OK,
    data: updatedAuthor,
    message: 'Author updated successfully!',
  })
})

const deleteAuthor = catchAsync(async (req, res) => {
  const deltedAuthor = await AuthorService.deleteAuthor(req.params.id)
  sendResponse<IAuthor>(res, {
    statusCode: httpStatus.NO_CONTENT,
    data: deltedAuthor,
    message: 'Author deleted successfully!',
  })
})

export const AuthorController = {
  createAuthor,
  getALllAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
}
