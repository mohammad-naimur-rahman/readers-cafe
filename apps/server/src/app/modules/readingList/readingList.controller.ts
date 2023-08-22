import httpStatus from 'http-status'
import { IReadingList } from 'validation/types'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ReadingListService } from './readingList.service'

const createReadingList = catchAsync(async (req, res) => {
  const createdReadingList = await ReadingListService.createReadingList(
    req.body,
  )
  sendResponse<IReadingList>(res, {
    statusCode: httpStatus.CREATED,
    data: createdReadingList,
    message: 'ReadingList created successfully!',
  })
})

const getALllReadingLists = catchAsync(async (req, res) => {
  const allReadingLists = await ReadingListService.getAllReadingLists()
  sendResponse<IReadingList[]>(res, {
    statusCode: httpStatus.OK,
    data: allReadingLists,
    message: 'All ReadingLists retrieved successfully!',
  })
})

const getReadingList = catchAsync(async (req, res) => {
  const ReadingList = await ReadingListService.getReadingList(req.params.id)
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
  )
  sendResponse<IReadingList>(res, {
    statusCode: httpStatus.OK,
    data: updatedReadingList,
    message: 'ReadingList updated successfully!',
  })
})

const deleteReadingList = catchAsync(async (req, res) => {
  const deltedReadingList = await ReadingListService.deleteReadingList(
    req.params.id,
  )
  sendResponse<IReadingList>(res, {
    statusCode: httpStatus.NO_CONTENT,
    data: deltedReadingList,
    message: 'ReadingList deleted successfully!',
  })
})

export const ReadingListController = {
  createReadingList,
  getALllReadingLists,
  getReadingList,
  updateReadingList,
  deleteReadingList,
}
