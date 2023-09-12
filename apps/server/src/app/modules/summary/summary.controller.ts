import httpStatus from 'http-status'
import { ISummary } from 'validation/types'
import paginationFields from '../../../constants/pagination'
import { RequestWithUser } from '../../../interfaces/RequestResponseTypes'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { summaryFilterableFields } from './summary.constants'
import { SummaryService } from './summary.service'

const createSummary = catchAsync(async (req, res) => {
  const createdSummary = await SummaryService.createSummary(
    req.body,
    (req as RequestWithUser).user,
  )
  sendResponse<ISummary>(res, {
    statusCode: httpStatus.CREATED,
    data: createdSummary,
    message: 'Summary created successfully!',
  })
})

const getALllSummaries = catchAsync(async (req, res) => {
  const allSummaries = await SummaryService.getAllSummaries()
  sendResponse<ISummary[]>(res, {
    statusCode: httpStatus.OK,
    data: allSummaries,
    message: 'All Summaries retrieved successfully!',
  })
})

const getALllUserSummaries = catchAsync(async (req, res) => {
  const filters = pick(req.query, summaryFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const allSummaries = await SummaryService.getAllUserSummeries(
    (req as RequestWithUser).user,
    filters,
    paginationOptions,
  )
  sendResponse<ISummary[]>(res, {
    statusCode: httpStatus.OK,
    data: allSummaries.data,
    meta: allSummaries.meta,
    message: 'All Summaries retrieved successfully!',
  })
})

const getSummary = catchAsync(async (req, res) => {
  const Summary = await SummaryService.getSummary(req.params.id)
  sendResponse<ISummary>(res, {
    statusCode: httpStatus.OK,
    data: Summary,
    message: 'Summary retrieved successfully!',
  })
})

const updateSummary = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedSummary = await SummaryService.updateSummary(
    id,
    body,
    (req as RequestWithUser).user,
  )
  sendResponse<ISummary>(res, {
    statusCode: httpStatus.OK,
    data: updatedSummary,
    message: 'Summary updated successfully!',
  })
})

const deleteSummary = catchAsync(async (req, res) => {
  await SummaryService.deleteSummary(
    req.params.id,
    (req as RequestWithUser).user,
  )
  sendResponse<ISummary>(res, {
    statusCode: httpStatus.NO_CONTENT,
    message: 'Summary deleted successfully!',
  })
})

export const SummaryController = {
  createSummary,
  getALllSummaries,
  getALllUserSummaries,
  getSummary,
  updateSummary,
  deleteSummary,
}
