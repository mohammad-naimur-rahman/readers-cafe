import httpStatus from 'http-status'
import { IShortContent } from 'validation/types'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ShortContentService } from './shortContent.service'

const createShortContent = catchAsync(async (req, res) => {
  const createdShortContent = await ShortContentService.createShortContent(
    req.body,
  )
  sendResponse<IShortContent>(res, {
    statusCode: httpStatus.CREATED,
    data: createdShortContent,
    message: 'ShortContent created successfully!',
  })
})

const getALllShortContents = catchAsync(async (req, res) => {
  const allShortContents = await ShortContentService.getAllShortContents()
  sendResponse<IShortContent[]>(res, {
    statusCode: httpStatus.OK,
    data: allShortContents,
    message: 'All ShortContents retrieved successfully!',
  })
})

const getShortContent = catchAsync(async (req, res) => {
  const ShortContent = await ShortContentService.getShortContent(req.params.id)
  sendResponse<IShortContent>(res, {
    statusCode: httpStatus.OK,
    data: ShortContent,
    message: 'ShortContent retrieved successfully!',
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
  getShortContent,
  updateShortContent,
  deleteShortContent,
}
