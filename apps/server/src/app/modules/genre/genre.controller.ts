import httpStatus from 'http-status'
import { IGenre } from 'validation/types'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { GenreService } from './genre.service'

const createGenre = catchAsync(async (req, res) => {
  const createdGenre = await GenreService.createGenre(req.body)
  sendResponse<IGenre>(res, {
    statusCode: httpStatus.CREATED,
    data: createdGenre,
    message: 'Genre created successfully!',
  })
})

const getALllGenres = catchAsync(async (req, res) => {
  const allGenres = await GenreService.getAllGenres()
  sendResponse<IGenre[]>(res, {
    statusCode: httpStatus.OK,
    data: allGenres,
    message: 'All Genres retrieved successfully!',
  })
})

const getGenre = catchAsync(async (req, res) => {
  const Genre = await GenreService.getGenre(req.params.id)
  sendResponse<IGenre>(res, {
    statusCode: httpStatus.OK,
    data: Genre,
    message: 'Genre retrieved successfully!',
  })
})

const updateGenre = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedGenre = await GenreService.updateGenre(id, body)
  sendResponse<IGenre>(res, {
    statusCode: httpStatus.OK,
    data: updatedGenre,
    message: 'Genre updated successfully!',
  })
})

const deleteGenre = catchAsync(async (req, res) => {
  const deltedGenre = await GenreService.deleteGenre(req.params.id)
  sendResponse<IGenre>(res, {
    statusCode: httpStatus.NO_CONTENT,
    data: deltedGenre,
    message: 'Genre deleted successfully!',
  })
})

export const GenreController = {
  createGenre,
  getALllGenres,
  getGenre,
  updateGenre,
  deleteGenre,
}
