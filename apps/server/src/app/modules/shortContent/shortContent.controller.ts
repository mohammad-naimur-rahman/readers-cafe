import httpStatus from 'http-status'
import { IShortContent } from 'validation/types'
import paginationFields from '../../../constants/pagination'
import { RequestWithUser } from '../../../interfaces/RequestResponseTypes'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { shortContentFilterableFields } from './shortContent.constants'
import { ShortContentService } from './shortContent.service'

const createShortContent = catchAsync(async (req, res) => {
  const createdShortContent = await ShortContentService.createShortContent(
    req.body,
    (req as RequestWithUser).user,
  )
  sendResponse<IShortContent>(res, {
    statusCode: httpStatus.CREATED,
    data: createdShortContent,
    message: 'ShortContent created successfully!',
  })
})

const getALllShortContents = catchAsync(async (req, res) => {
  const filters = pick(req.query, shortContentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const allShortContents = await ShortContentService.getAllShortContents(
    filters,
    paginationOptions,
  )
  sendResponse<IShortContent[]>(res, {
    statusCode: httpStatus.OK,
    meta: allShortContents.meta,
    data: allShortContents.data,
    message: 'All ShortContents retrieved successfully!',
  })
})

const getALllUserShortContents = catchAsync(async (req, res) => {
  const filters = pick(req.query, shortContentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const allShortContents = await ShortContentService.getAllUserShortContents(
    (req as RequestWithUser).user,
    filters,
    paginationOptions,
  )
  sendResponse<IShortContent[]>(res, {
    statusCode: httpStatus.OK,
    meta: allShortContents.meta,
    data: allShortContents.data,
    message: 'All ShortContents retrieved successfully!',
  })
})

const getShortContent = catchAsync(async (req, res) => {
  const shortContent = await ShortContentService.getShortContent(req.params.id)
  sendResponse<IShortContent>(res, {
    statusCode: httpStatus.OK,
    data: shortContent,
    message: shortContent
      ? 'ShortContent retrieved successfully!'
      : 'No short content found!',
  })
})

const updateShortContent = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedShortContent = await ShortContentService.updateShortContent(
    id,
    body,
    (req as RequestWithUser).user,
  )
  sendResponse<IShortContent>(res, {
    statusCode: httpStatus.OK,
    data: updatedShortContent,
    message: 'ShortContent updated successfully!',
  })
})

const deleteShortContent = catchAsync(async (req, res) => {
  const deltedShortContent = await ShortContentService.deleteShortContent(
    req.params.id,
    (req as RequestWithUser).user,
  )
  sendResponse<IShortContent>(res, {
    statusCode: httpStatus.NO_CONTENT,
    data: deltedShortContent,
    message: 'ShortContent deleted successfully!',
  })
})

export const ShortContentController = {
  createShortContent,
  getALllShortContents,
  getALllUserShortContents,
  getShortContent,
  updateShortContent,
  deleteShortContent,
}
