import httpStatus from 'http-status'
import { IDiscussion } from 'validation/types'
import paginationFields from '../../../constants/pagination'
import { RequestWithUser } from '../../../interfaces/RequestResponseTypes'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { discussionFilterableFields } from './discussion.constants'
import { DiscussionService } from './discussion.service'

const createDiscussion = catchAsync(async (req, res) => {
  const createdDiscussion = await DiscussionService.createDiscussion(
    req.body,
    (req as RequestWithUser).user,
  )

  sendResponse<IDiscussion>(res, {
    statusCode: httpStatus.CREATED,
    data: createdDiscussion,
    message: 'Discussion created successfully!',
  })
})

const getALllDiscussions = catchAsync(async (req, res) => {
  const filters = pick(req.query, discussionFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const allDiscussions = await DiscussionService.getAllDiscussions(
    filters,
    paginationOptions,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    meta: allDiscussions.meta,
    data: allDiscussions.data,
    message: 'All Discussions retrieved successfully!',
  })
})

const getALllUserDiscussions = catchAsync(async (req, res) => {
  const filters = pick(req.query, discussionFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const allDiscussions = await DiscussionService.getAllUserDiscussions(
    (req as RequestWithUser).user,
    filters,
    paginationOptions,
  )

  sendResponse<IDiscussion[]>(res, {
    statusCode: httpStatus.OK,
    meta: allDiscussions.meta,
    data: allDiscussions.data,
    message: 'All Discussions retrieved successfully!',
  })
})

const getDiscussion = catchAsync(async (req, res) => {
  const discussion = await DiscussionService.getDiscussion(req.params.id)

  sendResponse<IDiscussion>(res, {
    statusCode: httpStatus.OK,
    data: discussion,
    message: discussion
      ? 'Discussion retrieved successfully!'
      : 'No discussion found!',
  })
})

const updateDiscussion = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedDiscussion = await DiscussionService.updateDiscussion(
    id,
    body,
    (req as RequestWithUser).user,
  )

  sendResponse<IDiscussion>(res, {
    statusCode: httpStatus.OK,
    data: updatedDiscussion,
    message: 'Discussion updated successfully!',
  })
})

const deleteDiscussion = catchAsync(async (req, res) => {
  const deltedDiscussion = await DiscussionService.deleteDiscussion(
    req.params.id,
    (req as RequestWithUser).user,
  )

  sendResponse<IDiscussion>(res, {
    statusCode: httpStatus.NO_CONTENT,
    data: deltedDiscussion,
    message: 'Discussion deleted successfully!',
  })
})

export const DiscussionController = {
  createDiscussion,
  getALllDiscussions,
  getALllUserDiscussions,
  getDiscussion,
  updateDiscussion,
  deleteDiscussion,
}
