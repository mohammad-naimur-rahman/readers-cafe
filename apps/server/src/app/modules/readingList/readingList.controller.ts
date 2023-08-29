import httpStatus from 'http-status'
import { IReadingList } from 'validation/types'
import { RequestWithUser } from '../../../interfaces/RequestResponseTypes'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ReadingListService } from './readingList.service'

const createReadingList = catchAsync(async (req, res) => {
  const createdReadingList = await ReadingListService.createReadingList(
    req.body,
    (req as RequestWithUser).user,
  )
  sendResponse<IReadingList>(res, {
    statusCode: httpStatus.CREATED,
    data: createdReadingList,
    message: 'ReadingList created successfully!',
  })
})

const getReadingList = catchAsync(async (req, res) => {
  const ReadingList = await ReadingListService.getReadingList(
    (req as RequestWithUser).user,
  )
  sendResponse<IReadingList>(res, {
    statusCode: httpStatus.OK,
    data: ReadingList,
    message: 'ReadingList retrieved successfully!',
  })
})

const updateReadingList = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedReadingList = await ReadingListService.updateReadingList(
    id,
    body,
    (req as RequestWithUser).user,
  )
  sendResponse<IReadingList>(res, {
    statusCode: httpStatus.OK,
    data: updatedReadingList,
    message: 'ReadingList updated successfully!',
  })
})

const deleteReadingList = catchAsync(async (req, res) => {
  await ReadingListService.deleteReadingList(
    req.params.id,
    (req as RequestWithUser).user,
  )
  sendResponse<IReadingList>(res, {
    statusCode: httpStatus.NO_CONTENT,
    message: 'ReadingList deleted successfully!',
  })
})

export const ReadingListController = {
  createReadingList,
  getReadingList,
  updateReadingList,
  deleteReadingList,
}
