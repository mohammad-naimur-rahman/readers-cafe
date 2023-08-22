import httpStatus from 'http-status'
import { IDiscussion } from 'validation/types'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { DiscussionService } from './discussion.service'

const createDiscussion = catchAsync(async (req, res) => {
  const createdDiscussion = await DiscussionService.createDiscussion(req.body)
  sendResponse<IDiscussion>(res, {
    statusCode: httpStatus.CREATED,
    data: createdDiscussion,
    message: 'Discussion created successfully!',
  })
})

const getALllDiscussions = catchAsync(async (req, res) => {
  const allDiscussions = await DiscussionService.getAllDiscussions()
  sendResponse<IDiscussion[]>(res, {
    statusCode: httpStatus.OK,
    data: allDiscussions,
    message: 'All Discussions retrieved successfully!',
  })
})

const getDiscussion = catchAsync(async (req, res) => {
  const Discussion = await DiscussionService.getDiscussion(req.params.id)
  sendResponse<IDiscussion>(res, {
    statusCode: httpStatus.OK,
    data: Discussion,
    message: 'Discussion retrieved successfully!',
  })
})

const updateDiscussion = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedDiscussion = await DiscussionService.updateDiscussion(id, body)
  sendResponse<IDiscussion>(res, {
    statusCode: httpStatus.OK,
    data: updatedDiscussion,
    message: 'Discussion updated successfully!',
  })
})

const deleteDiscussion = catchAsync(async (req, res) => {
  const deltedDiscussion = await DiscussionService.deleteDiscussion(
    req.params.id,
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
  getDiscussion,
  updateDiscussion,
  deleteDiscussion,
}
